import uvicorn
from fastapi import FastAPI
from pydantic import BaseModel
from tool import get_product_details, get_duration
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage
from langgraph.prebuilt import create_react_agent
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI()

class UserQuery(BaseModel):
    query: str

# model = ChatGroq(model="llama-3.3-70b-versatile", api_key=os.getenv('GROQ_KEY'))
model = ChatGoogleGenerativeAI(model='gemini-2.0-flash', api_key=os.getenv('GEMINI_API_KEY'))
tools = [get_product_details, get_duration]
system_prompt = """
You are a campaign manager and a creative writer. You have {tools} available to you.
Create a campaign report for the product provided by the user.
The campaign report must be structured with introduction section, budget section and marketing section.
The introduction section should describe and highlight the product.
The budget section should describe the budge with the duration.
The marketing section should have a slogan for the product. It should be a creative sales pitch.
Begin!
"""
agent_executor = create_react_agent(model, tools=tools, prompt=system_prompt)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/")
def home():
    return { "Data": "Test" }

@app.post("/ask")
async def ask(user_input: UserQuery):
    # response = model_with_tools.invoke([HumanMessage(content=user_input.query)])
    responses = agent_executor.invoke({"messages": [HumanMessage(content=user_input.query)]})
    # Read
    # https://github.com/langchain-ai/langchain/discussions/28686


    return { "response": responses["messages"][-1] }


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)