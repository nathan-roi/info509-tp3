const express = require('express');

const { MongoClient } = require('mongodb');

const app = express();
const port = 3000; 

// URL MongoDB et base de données
const mongoUrl = 'mongodb://localhost:27017'; 
const dbName = 'tp2';

app.use(express.json());

const path = require('path');

////API

// ############ Clients ############

// Route pour rechercher un utilisateur par ID
app.get('/customer/:CustomerID', async (req, res) => {
    const CustomerID = req.params.CustomerID; 
    if (typeof CustomerID !== 'string') {
        return res.status(400).json({ error: 'Invalid costumerID. Must be a string' });
    }

    let client;
    try {
        client = new MongoClient(mongoUrl);
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db(dbName);
        const collection = db.collection('customers');

        // Recherche dans MongoDB
        const customer = await collection.findOne({ CustomerID }); 
        if (customer) {
            res.json(customer);
        } else {
            res.status(404).json({ error: 'customer not found' });
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

// Route pour afficher tout les clients
app.get('/customers', async (req, res) => {
    
    let client;
    try {
        client = new MongoClient(mongoUrl);
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db(dbName);
        const collection = db.collection('customers');

        // Recherche dans MongoDB
        const customers = await collection.find({}).toArray();

        if (customers) {
            res.json(customers);
        } else {
            res.status(404).json({ error: 'no customers here' });
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


// ############ Produits ############

// Route pour afficher tout les produits
app.get('/products', async (req, res) => {
    
    let client;
    try {
        client = new MongoClient(mongoUrl);
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db(dbName);
        const collection = db.collection('products');

        // Recherche dans MongoDB
        const products = await collection.find({}).toArray();

        if (products) {
            res.json(products);
        } else {
            res.status(404).json({ error: 'no products here' });
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

// ############ Commandes ############

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

// Route pour afficher toutes les commandes
app.get('/orders', async (req, res) => {
    
    let client;
    try {
        client = new MongoClient(mongoUrl);
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db(dbName);
        const collection = db.collection('orders');

        // Recherche dans MongoDB
        const orders = await collection.find({}).toArray();

        if (orders) {
            res.json(orders);
        } else {
            res.status(404).json({ error: 'no orders here' });
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

// Route pour rechercher les commandes d'un client
app.get('/customer_order/:CustomerID', async (req, res) => {
    const CustomerID = req.params.CustomerID; 
    if (typeof CustomerID !== 'string') {
        return res.status(400).json({ error: 'Invalid costumerID. Must be a string' });
    }

    let client;
    try {
        client = new MongoClient(mongoUrl);
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db(dbName);
        const orderCollection = db.collection('orders');

        // Recherche dans MongoDB
        const pipeline = [];
        pipeline.push({$match: { 'CustomerID': CustomerID}});

        const aggregationResult = await orderCollection.aggregate(pipeline).toArray();

        if (aggregationResult) {
            res.json(aggregationResult);
        } else {
            res.status(404).json({ error: 'order not found' });
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

// ############ Fournisseurs ############

// Route pour rechercher un fournisseur par ID
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

// Route pour obtenir tous les fournisseurs
app.get('/suppliers', async (req, res) => {
    let client;
    try {
        client = new MongoClient(mongoUrl);
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db(dbName);
        const collection = db.collection('suppliers');

        const suppliers = await collection.find({}).toArray();
        if (suppliers) {
            res.json(suppliers);
        } else {
            res.status(404).json({ error: 'No supplier here' });
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

// ############ SERVEUR ############

// Lancement du serveur
app.listen(port, () => {
    console.log(`API server is running on http://localhost:${port}`);
});