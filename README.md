# Outfit AI - AI-Powered Outfit Finder

Designed an AI-powered Outfit Finder using OpenAI embeddings and vector search to deliver visually similar outfit recommendations.

## Overview

Outfit AI is a sophisticated backend service that leverages artificial intelligence to analyze outfit images and provide intelligent recommendations. The system uses computer vision to understand clothing items and their visual characteristics, then employs vector similarity search to find matching or complementary outfits from a curated database.

## Technology Stack

### Core Technologies

- **NestJS** - Modern Node.js framework for building scalable server-side applications
- **TypeScript** - Type-safe JavaScript for enhanced development experience
- **MongoDB Atlas** - Cloud database with vector search capabilities
- **Mongoose** - MongoDB object modeling for Node.js

### AI & Machine Learning

- **OpenAI API** - GPT-4 Vision for image analysis and outfit description generation
- **OpenAI Embeddings** - Text embedding generation using `text-embedding-3-small` model
- **MongoDB Vector Search** - Vector similarity search for outfit recommendations

### Additional Services

- **ImageKit** - Image optimization and CDN service
- **Multer** - File upload handling for images

## Architecture

The application follows a modular architecture with the following key components:

### Core Modules

- **OpenAI Module** - Handles AI-powered image analysis and embedding generation
- **Items Module** - Manages clothing items with vector embeddings
- **Stores Module** - Manages store information and metadata
- **MongoDB Module** - Database connection and configuration

### Data Models

- **Item Schema** - Stores clothing items with embeddings, metadata, and store references
- **Store Schema** - Manages store information, categories, and links

## Features

- **AI-Powered Image Analysis** - Uses GPT-4 Vision to analyze outfit images and generate detailed descriptions
- **Vector Embeddings** - Converts outfit descriptions into high-dimensional vectors for similarity matching
- **Vector Search** - MongoDB Atlas vector search for finding visually similar outfits
- **Store Management** - Complete CRUD operations for managing clothing stores
- **Item Management** - Full item lifecycle management with embedding storage
- **Image Processing** - Integrated image upload and optimization via ImageKit

## Getting Started

## API Endpoints

### Items

- `POST /items` - Create new clothing item with embedding
- `GET /items` - Retrieve all items
- `GET /items/:id` - Get specific item
- `PUT /items/:id` - Update item
- `DELETE /items/:id` - Delete item

### Stores

- `POST /stores` - Create new store
- `GET /stores` - Retrieve all stores
- `GET /stores/:id` - Get specific store
- `PUT /stores/:id` - Update store
- `DELETE /stores/:id` - Delete store


## How It Works

1. **Image Upload** - Users upload outfit images
2. **AI Analysis** - GPT-4 Vision analyzes the image and generates a detailed description
3. **Embedding Generation** - The description is converted to a vector embedding using OpenAI's embedding model
4. **Vector Storage** - Embeddings are stored in MongoDB Atlas with vector search capabilities
5. **Similarity Search** - When searching for similar outfits, the system performs vector similarity search to find visually similar items
6. **Recommendations** - Results are ranked by similarity and returned to the user


## Future Enhancements

- Real-time outfit recommendations
- Style preference learning
- Integration with e-commerce platforms
- Mobile app support
- Advanced filtering and search capabilities
