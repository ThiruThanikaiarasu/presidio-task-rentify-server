const propertyModel = require("../models/propertyModel")
const userModel = require("../models/userModel")
const bcrypt = require('bcryptjs')

const signup = async (request, response) => {
    const { firstName, lastName, phone , email, password, role } = request.body

    try{
        const existingUser = await userModel.findOne({email})
        if(existingUser) {
            response.status(409).send({ message: 'Email id already exist'})
        }
        const userToBeRegistered = new userModel({firstName, lastName, phone, email, password, role })

        await userToBeRegistered.save()

        let options = {
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        }

        const token = userToBeRegistered.generateAccessJWT()     
        response.cookie('SessionID', token, options)
        response.status(201).send({ message: 'User created successfully'})
    } 
    catch(error) {
        response.status(500).send({ message: error.message})
    }
}

const login = async (request, response) => {
    const allUserData = await userModel.find()
    if(allUserData.length == 0) {
        const initialUser = new userModel(initialData)
        await initialUser.save()
    }    

    const {email} = request.body 
    try{
        const existingUser = await userModel.findOne({ email }).select('+password') // default the mongoose doesn't provide password
        if(!existingUser) {
            return response.status(401).send({ message: 'Invalid email address'})
        }

        const validatePassword = await bcrypt.compare(`${request.body.password}`, existingUser.password)
        if(!validatePassword) {
            return response.status(401).send({ message: 'Invalid password'})
        }

        let options = {
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        }
        const token = existingUser.generateAccessJWT()     
        response.cookie('SessionID', token, options)
        response.status(200).send({ message: 'Login Successfully'})
    } 
    catch(error) {
        response.status(500).send({ message: error.message})
    }
}

const addANewProperty = async (request, response) => {
    const {
        title, description, address, type, price, size, floor, totalFloor, preferredTenant, parkingType, furnished, bhkType, bathrooms, ageOfProperty, waterSupply, isNonVegAllowed, listedDate, availability, availableFrom, nearBySchool, nearByCollege, nearByHospital,
    } = request.body
    const {filename} = request.file || request.body.images
    const owner = request.user._id
    console.log(filename)

    try{
        const image = '/public/images/' + filename
        const newProperty = new propertyModel({
            title, 
            description, 
            address, 
            type, 
            price, 
            size, 
            floor, 
            totalFloor, 
            preferredTenant, 
            parkingType, 
            furnished, 
            bhkType, 
            bathrooms, 
            ageOfProperty, 
            waterSupply, 
            isNonVegAllowed, 
            owner, 
            listedDate, 
            availability, 
            availableFrom,
            nearBySchool,
            nearByCollege,
            nearByHospital,
            image
        })

        // console.log(newProperty)
        // await newProperty.save()

        response.status(201).send({ message: 'Property added successfully'})
    }
    catch(error) {
        response.status(500).send({ message: error.message})
    }
}

const editPropertyDetails = async (request, response) => {
    const { _id } = request.body;
    const propertyDetail = request.body || null;
    const { filename } = request.file || null;

    try {
        const property = await propertyModel.findById(_id);
        if (!property) {
            return response.status(404).send({ message: 'Property not found' });
        }

        if (propertyDetail) {
            Object.keys(propertyDetail).forEach(detail => {
                if (propertyDetail[detail] !== undefined) {
                    property[detail] = propertyDetail[detail];
                }
            });
        }

        if (filename) {
            property.images.push(filename);
        }

        await property.save();

        response.status(200).send({ message: 'Property updated successfully' });
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};


const deleteTheProperty = async (request, response) => {
    const { _id } = request.body
    try {
        const property = await userModel.findOne({ _id })
        if(property) {
            await propertyModel.deleteOne({ _id: id })
            response.status(200).send({ message: 'Property deleted successfully'})
        }
        else {
            response.status(404).send({status: 'error', code: 404, message: 'Property not found'})
        }

    }
    catch(error) {
        response.status(500).json({ message: error.message,})
    
    }
}

const searchTheProperty = async (request, response) => {
    const { city, roomType, bhkType } = request.query
    try{
        const matchedProperty = await propertyModel.aggregate([
            {
                $match: {
                    "address.city" : { $regex: new RegExp(city, 'i') },
                    "type": { $regex: new RegExp(roomType, 'i') },
                    "bhkType": bhkType
                }
            }
        ])

        if(!matchedProperty || matchedProperty.length == 0) {
            return response.status(404).send({ message: "No property found in the searched location"})
        }

        response.status(200).send({ data: matchedProperty, message: "Properties found"})
    }
    catch(error) {
        response.status(500).send({ message: error.message })
    }
}

const searchThePropertyWithFilters = async (request, response) => {

    const { minPrice } = request.query || 0
    const { maxPrice } = request.query || 500000


}

module.exports = {
    signup,
    login,

    addANewProperty,
    editPropertyDetails,
    deleteTheProperty,

    searchTheProperty,
    searchThePropertyWithFilters
}