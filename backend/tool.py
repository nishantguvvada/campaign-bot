from langchain_core.tools import tool
from database import get_database
import os

@tool
def get_product_details(item: str):
    """
    Fetch the product details such as product name, product price, quantity, reviews, stars and feature from the database to create a campaign
    """
    db = get_database()
    collection = db[os.getenv('COLLECTION')]

    item_details = collection.find({"product_name": item})
    
    details = item_details[0]

    return details


@tool
def get_duration(budget: float):
    """
    Calculate the duration of the campaign given the budget
    """
    duration = budget / 8
    return duration
