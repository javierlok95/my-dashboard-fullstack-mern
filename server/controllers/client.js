import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import Transaction from "../models/Transaction.js";
import User from "../models/User.js";
import getCountryIso3 from "country-iso-2-to-3";

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();

        const productsWithStats = await Promise.all(
            products.map(async (product) => {// This means with each product, we cycle through "(product)" we make API call to the database for every single one
                const stat = await ProductStat.find({// This part is essentially asking MongDB that we want info for each product for its stat
                    productId: product._id // grab and pass it on product ID
                })
                return {
                    ...product._doc,
                    stat,
                };
            })
        );
        res.status(200).json(productsWithStats)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
};

export const getCustomers = async (req, res) => {
    try {
        const customers = await User.find({ role: "user" }).select("-password");
        res.status(200).json(customers);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
};

export const getTransactions = async (req, res) => {
    try {
        // sort should look like this: { "field": "userId", "sort": "desc"}
        const { page = 1, pageSize = 20, sort = null, search = "" } = req.query; // This part is grabbing from the frontend to send us the req.query values

        //formatted sort should look like { userId: -1 }
        const generateSort = () => {
            const sortParsed = JSON.parse(sort);
            const sortFormatted = {
                [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1)
            };

            return sortFormatted;
        }
        const sortFormatted = Boolean(sort) ? generateSort() : {};

        const transactions = await Transaction.find({
            $or: [
                { cost: { $regex: new RegExp(search, "i") } },
                { userId: { $regex: new RegExp(search, "i") } }
            ],
        })
            .sort(sortFormatted)
            .skip(page * pageSize)
            .limit(pageSize);

        const total = await Transaction.countDocuments({
            name: { $regex: search, $options: "i" }
        });

        res.status(200).json({
            transactions,
            total
        });
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
};

export const getGeography = async (req, res) => {
    try {
        const users = await User.find();

        const mappedLocations = users.reduce((acc, { country }) => {
            const countryISO3 = getCountryIso3(country); //For every single of the country , we are going to grab a country value to convert it to the countryISO3 format
            if (!acc[countryISO3]) { // We are going to add to this object and if it doesnt exist, we are going to set it up to the "=0" format
                acc[countryISO3] = 0;
            }
            acc[countryISO3]++; //Once we are doing that we are going to increase that value
            return acc; //return that accumulator
        }, {}); //in the end we are going to have an object that lists all the countries as our key and the value going to represent the number of users in that country

        const formattedLocations = Object.entries(mappedLocations).map(
            ([country, count]) => {
                return { id: country, value: count }
            }
        );

        res.status(200).json(formattedLocations);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
};