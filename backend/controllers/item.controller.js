import Item from "../models/item.model.js";

/*======================= add item========================== */
export const addItem = async (req,res) => {
    // const { } = req.body
    const item = {
        "name": "Sidh Mangal Yantra",
        "image": "sidhMangal.jpg",
        "price": 6100
    }

    let newItem = new Item({
        name:item.name,
        image:item.image,
        price:item.price
    })
    newItem = await newItem.save()
    return res.status(201).json(newItem)

}

/* ========================== Get all items ========================== */
export const getAllItems = async (req,res) => {
    try {
        const items = await Item.find()
        if (items) {
            return res.status(200).json({success:true,message:"Items fetched successfully",items})
        }
        return res.status(404).json({success:false,message:"Item Not Found"})
        
    } catch (error) {
        console.log(`error occur at getAllOrders Controller : `,error);
        return res.status(500).json({success:false,message:"Something went wrong!"})
    }
}