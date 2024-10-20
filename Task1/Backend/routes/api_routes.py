from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Any
from lib.rule_engine import create_rule,combine_rules
from lib.json_to_ast import json_to_ast

api_router = APIRouter()

class RuleRequest(BaseModel):
    rule_string: str

class CombineRulesRequest(BaseModel):
    rules: List[str]

class EvaluateRuleRequest(BaseModel):
    ast: Dict[str, Any]
    context: Dict[str, Any]

@api_router.post("/create_rule")
def create_rule_endpoint(request: RuleRequest):
    try:
        rule_ast = create_rule(request.rule_string)
        return  rule_ast
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@api_router.post("/combine_rules")
def combine_rules_endpoint(request: CombineRulesRequest):
    try:
        combined_ast = combine_rules(request.rules)
        return combined_ast
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@api_router.post("/evaluate_rule")
def evaluate_rule_endpoint(request: EvaluateRuleRequest):
    try:
        ast = json_to_ast(request.ast)  # Convert JSON to AST
        result =  ast.evaluate(request.context)
        return {"result": result}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))