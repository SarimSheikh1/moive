import streamlit as st
import requests
from dotenv import load_dotenv
import os

# Load API key from .env
load_dotenv()

# Get API Key
API_KEY = os.getenv("API_KEY")
st.write("🔑 API Key Loaded:", API_KEY)  # Debug API Key

# Validate API Key
if not API_KEY:
    st.error("🚨 API Key not found. Please set it in the .env file.")
    st.stop()

# API Base URL
API_URL = "http://www.omdbapi.com/?apikey=" + API_KEY + "&t="

# Streamlit App
st.title("🎬 Movie Explorer")
st.write("Search for movies and explore their details!")

# Movie Search Input
movie_name = st.text_input("Enter movie name:")

# Search Button
if st.button("Search"):
    if movie_name:
        try:
            # Send API Request
            response = requests.get(API_URL + movie_name)
            data = response.json()

            # Debug: Show API response
            st.json(data)

            # Handle API response
            if data.get("Response") == "True":
                st.image(data.get("Poster", ""), width=200)
                st.subheader(data.get("Title", "Unknown"))
                st.write(f"**Year:** {data.get('Year', 'N/A')}")
                st.write(f"**Genre:** {data.get('Genre', 'N/A')}")
                st.write(f"**Director:** {data.get('Director', 'N/A')}")
                st.write(f"**Plot:** {data.get('Plot', 'N/A')}")
                st.write(f"**IMDB Rating:** {data.get('imdbRating', 'N/A')}")
            else:
                st.error(f"🎬 Movie not found. Error: {data.get('Error', 'Unknown error')}")

        except requests.exceptions.RequestException as e:
            st.error(f"💥 Error fetching data: {e}")
    else:
        st.warning("⚠️ Please enter a movie name!")
