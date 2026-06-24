from collections import deque
from typing import Any

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:3000'],
    allow_methods=['*'],
    allow_headers=['*'],
)


class Pipeline(BaseModel):
    nodes: list[dict[str, Any]] = Field(default_factory=list)
    edges: list[dict[str, Any]] = Field(default_factory=list)


def is_directed_acyclic_graph(nodes, edges):
    graph = {}
    indegrees = {}

    for node in nodes:
        node_id = node.get('id')

        if node_id is None:
            continue

        graph.setdefault(node_id, set())
        indegrees.setdefault(node_id, 0)

    for edge in edges:
        source = edge.get('source')
        target = edge.get('target')

        if source is None or target is None:
            continue

        graph.setdefault(source, set())
        graph.setdefault(target, set())
        indegrees.setdefault(source, 0)
        indegrees.setdefault(target, 0)

        if target not in graph[source]:
            graph[source].add(target)
            indegrees[target] += 1

    nodes_to_visit = deque(
        node_id for node_id, indegree in indegrees.items() if indegree == 0
    )
    visited_count = 0

    while nodes_to_visit:
        node_id = nodes_to_visit.popleft()
        visited_count += 1

        for next_node_id in graph[node_id]:
            indegrees[next_node_id] -= 1

            if indegrees[next_node_id] == 0:
                nodes_to_visit.append(next_node_id)

    return visited_count == len(indegrees)


@app.get('/')
def read_root():
    return {'Ping': 'Pong'}


@app.post('/pipelines/parse')
def parse_pipeline(pipeline: Pipeline):
    return {
        'num_nodes': len(pipeline.nodes),
        'num_edges': len(pipeline.edges),
        'is_dag': is_directed_acyclic_graph(pipeline.nodes, pipeline.edges),
    }
