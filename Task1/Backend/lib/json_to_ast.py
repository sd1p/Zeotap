from typing import Dict, Any
from .node import Node

def json_to_ast(data: Dict[str, Any]) -> Node:
    node_type = data.get("type")
    if node_type == "operand":
        return Node(node_type="operand", value=data["value"])
    elif node_type == "operator":
        left_node = json_to_ast(data["left"]) if "left" in data else None
        right_node = json_to_ast(data["right"]) if "right" in data else None
        return Node(node_type="operator", value=data["value"], left=left_node, right=right_node)
    else:
        raise ValueError(f"Unknown node type: {node_type}")