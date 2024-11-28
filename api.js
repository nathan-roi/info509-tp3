const express = require('express');

const { MongoClient } = require('mongodb');

const app = express();
const port = 3000; 

// URL MongoDB et base de données
const mongoUrl = 'mongodb://localhost:27017'; 
const dbName = 'td5';

app.use(express.json());


////API

// Route pour rechercher un produit par ID
app.get('/product/:productID', async (req, res) => {
    const productID = parseInt(req.params.productID, 10); 
    if (isNaN(productID)) {
        return res.status(400).json({ error: 'Invalid productID. Must be an integer.' });
    }

    let client;
    try {
        client = new MongoClient(mongoUrl);
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db(dbName);
        const collection = db.collection('products');

        // Recherche dans MongoDB
        const product = await collection.findOne({ productID }); 
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        if (client) {
            await client.close();
        }
    }
});

// Route pour rechercher un client par ID
app.get('/supplier/:SupplierID', async (req, res) => {

    const supplierID = parseInt(req.params.SupplierID, 10);
    if (isNaN(supplierID)) {
        return res.status(400).json({ error: 'Invalid supplierID. Must be an integer.' });
    }

    let client;
    try {
        client = new MongoClient(mongoUrl);
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db(dbName);
        const collection = db.collection('suppliers');

        const supplier = await collection.findOne({ SupplierID: supplierID });
        if (supplier) {
            res.json(supplier);
        } else {
            res.status(404).json({ error: 'Supplier not found' });
        }
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        if (client) {
            await client.close();
        }
    }
});

// Route pour rechercher une commande par ID
app.get('/order/:OrderID', async (req, res) => {

    const orderID = parseInt(req.params.OrderID, 10);
    if (isNaN(orderID)) {
        return res.status(400).json({ error: 'Invalid orderID. Must be an integer.' });
    }

    let client;
    try {
        client = new MongoClient(mongoUrl);
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db(dbName);
        const collection = db.collection('orders');

        const order = await collection.findOne({ OrderID: orderID });
        if (order) {
            res.json(order);
        } else {
            res.status(404).json({ error: 'Order not found' });
        }
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        if (client) {
            await client.close();
        }
    }
});

// Route pour rechercher les produits d'un fournisseur
app.get('/supplier_product/:SupplierID', async (req, res) => {
    const supplierID = parseInt(req.params.SupplierID, 10);
    console.log("Received SupplierID:", supplierID); // Log la valeur reçue

    if (isNaN(supplierID)) {
        console.log("Invalid SupplierID"); // Ajoutez ce log
        return res.status(400).json({ error: 'Invalid supplierID. Must be an integer.' });
    }

    let client;
    try {
        client = new MongoClient(mongoUrl);
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db(dbName);
        const Collection = db.collection('products');

        const pipeline = [];
        pipeline.push({ $match: { supplierID: supplierID } });

        const aggregationResult = await Collection.aggregate(pipeline).toArray();

        if (aggregationResult.length > 0) {
            res.json(aggregationResult);
        } else {
            res.status(404).json({ error: 'Products not found for the given supplierID' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        if (client) {
            await client.close();
        }
    }
});



// Lancement du serveur
app.listen(port, () => {
    console.log(`API server is running on http://localhost:${port}`);
});

