const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Product = require('./models/Product');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

const users = await User.insertMany([ 
   // Super Admin
  {
    name: "NEXCART Super Admin",
    email: "superadmin@nexcart.com",
    password: hashedPassword,
    role: "superadmin",
  },

  // Sellers
  {
    name: "TechZone Electronics",
    email: "techzone@nexcart.com",
    password: hashedPassword,
    role: "admin",
  },
  {
    name: "Gadget Galaxy",
    email: "gadget@nexcart.com",
    password: hashedPassword,
    role: "admin",
  },
  {
    name: "Fashion Hub",
    email: "fashion@nexcart.com",
    password: hashedPassword,
    role: "admin",
  },
  {
    name: "Grocery World",
    email: "grocery@nexcart.com",
    password: hashedPassword,
    role: "admin",
  },

  // Customers
  {
    name: "Rahul Sharma",
    email: "rahul@gmail.com",
    password: hashedPassword,
    role: "user",
  },
  {
    name: "Priya Das",
    email: "priya@gmail.com",
    password: hashedPassword,
    role: "user",
  },
  {
    name: "Aman Singh",
    email: "aman@gmail.com",
    password: hashedPassword,
    role: "user",
  },
  {
    name: "Neha Roy",
    email: "neha@gmail.com",
    password: hashedPassword,
    role: "user",
  },
  {
    name: "Arjun Patel",
    email: "arjun@gmail.com",
    password: hashedPassword,
    role: "user",
  },
]);
const techZone = users.find((user) => user.email === "techzone@nexcart.com");
const gadgetGalaxy = users.find((user) => user.email === "gadget@nexcart.com");
const fashionHub = users.find((user) => user.email === "fashion@nexcart.com");
const groceryWorld = users.find((user) => user.email === "grocery@nexcart.com");

   const products = [
    // Electronics
  {
    name: "Apple iPhone 15 Pro",
    description: "256GB, Natural Titanium, A17 Pro chip.",
    price: 134999,
    category: "Electronics",
    stock: 20,
    imageUrl: "https://images.unsplash.com/photo-1695048133142-1a20484d2569",
    seller: techZone._id,
    ratings: 4.9,
    numReviews: 120
  },
  {
    name: "Samsung Galaxy S25",
    description: "Latest Samsung flagship smartphone.",
    price: 89999,
    category: "Electronics",
    stock: 18,
    imageUrl: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf",
    ratings: 4.8,
    seller: gadgetGalaxy._id,
    numReviews: 90
  },
  {
    name: "Apple Watch Series 10",
    description: "Advanced health and fitness smartwatch.",
    price: 45999,
    category: "Electronics",
    stock: 25,
    imageUrl: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d",
    seller: techZone._id,
    ratings: 4.7,
    numReviews: 80
  },
  {
    name: "Sony Alpha Camera",
    description: "Professional mirrorless camera.",
    price: 124999,
    category: "Electronics",
    stock: 10,
    imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32",
    seller: gadgetGalaxy._id,
    ratings: 4.9,
    numReviews: 65
  },
  // Fashion
    {
    name: "Men's Cotton T-Shirt",
    description: "100% premium cotton round neck T-shirt.",
    price: 799,
    category: "Fashion",
    stock: 80,
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    seller: fashionHub._id,
    ratings: 4.5,
    numReviews: 45
  },
  {
    name: "Women's Kurti",
    description: "Elegant ethnic wear for women.",
    price: 1499,
    category: "Fashion",
    stock: 50,
    imageUrl: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b",
    seller: fashionHub._id,
    ratings: 4.6,
    numReviews: 38
  },
  {
    name: "Denim Jeans",
    description: "Slim fit blue denim jeans.",
    price: 1999,
    category: "Fashion",
    stock: 60,
    imageUrl: "https://images.unsplash.com/photo-1542272604-787c3835535d",
    seller: fashionHub._id,
    ratings: 4.4,
    numReviews: 32
  },
  {
    name: "Running Shoes",
    description: "Lightweight running shoes for everyday comfort.",
    price: 2999,
    category: "Fashion",
    stock: 40,
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    seller: fashionHub._id,
    ratings: 4.7,
    numReviews: 60
  },
  // Food
    {
    name: "Cadbury Dairy Milk",
    description: "Classic milk chocolate bar.",
    price: 120,
    category: "Food",
    stock: 200,
    imageUrl: "https://images.unsplash.com/photo-1511381939415-e44015466834",
    seller: groceryWorld._id,
    ratings: 4.8,
    numReviews: 150
  },
  {
    name: "Oreo Biscuits",
    description: "Chocolate cream sandwich biscuits.",
    price: 40,
    category: "Food",
    stock: 300,
    imageUrl: "https://images.unsplash.com/photo-1589985270958-6a9f2d2f4b6b",
    seller: groceryWorld._id,
    ratings: 4.7,
    numReviews: 95
  },
  {
    name: "Lay's Classic Chips",
    description: "Salted potato chips.",
    price: 30,
    category: "Food",
    stock: 250,
    imageUrl: "https://images.unsplash.com/photo-1566478989037-eec170784d0b",
    seller: groceryWorld._id,
    ratings: 4.5,
    numReviews: 70
  },
  {
    name: "Coca-Cola 750ml",
    description: "Refreshing soft drink.",
    price: 60,
    category: "Food",
    stock: 180,
    imageUrl: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e",
    seller: groceryWorld._id,
    ratings: 4.6,
    numReviews: 85
  }
];

    const insertedProducts = await Product.insertMany(products);

console.log("Inserted products:", insertedProducts.length);
console.log("✅ Data Imported Successfully!");
    process.exit();
  } catch (error) {
    console.error(`❌ Error with data import: ${error.message}`);
    process.exit(1);
  }
};

importData();
