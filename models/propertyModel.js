const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is mandatory field'],
        },
        description: {
            type: String,
            required: [true, 'Description is mandatory field'],
        },
        address: {
            street: {
                type: String,
                required: [true, 'Street is mandatory field'],
            },
            city: {
                type: String,
                required: [true, 'City is mandatory field'],
            },
            localplace: {
                type: String,
                required: [true, 'Local place is mandatory field'],
            },
            state: {
                type: String,
                required: [true, 'State is mandatory field'],
            },
            country: {
                type: String,
                required: [true, 'Country is mandatory field'],
            },
            zipCode: {
                type: String,
                required: [true, 'Zip code is mandatory field'],
                match: /^\d{6}$/
            }
        },
        type: {
            type: String,
            enum: ['apartment', 'house', 'office'],
            required: [true, 'Property type is mandatory field'],
        },
        price: {
            type: Number,
            required: [true, 'Price is mandatory field'],
        },
        size: {
            type: Number,  // Sq. feet
            required: [true, 'Password is mandatory field'],
        },
        floor: {
            type: Number, 
            required: [true, 'Property floor is a mandatory field']
        },
        totalFloor: {
            type: Number, 
            required: [true, 'Total floor is a mandatory field']
        },
        preferredTenant: {
            type: [String], 
            required: [true, 'Perfered Tenant is a mandatory field'],
            enum: ['family', 'bachelors', 'mens', 'women']
        },
        parkingType: {
            type: String,
            required: [true, 'Parking type is a mandatory field'],
            enum: ['bike', 'car', 'none']
        },
        furnished: {
            type: String, 
            required: [true, 'Furnished Type is a mandatory field'],
            enum: ['fully-furnished', 'semi-furnished', 'un-furnished']
        },
        bhkType: {
            type: String,
            required: [true, 'BHK type is a mandatory field '],
            match: /^[1-6]BHK$/
        },
        bathrooms: {
            type: Number,
            required: [true, 'Password is mandatory field'],
        },
        ageOfProperty: {
            type: Number,
            required: [true, 'Age of the property is a mandatory field'],
            max: 99,
        },
        waterSupply: {
            type: String, 
            required: [true, 'Water supply is a mandatory field']
        },
        isNonVegAllowed: {
            type: Boolean,
            required: [true, 'Non veg allowed is a mandatory field']
        },
        images: {
            type: String  // Array of image URLs
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: [true, 'Password is mandatory field'],
        },
        listedDate: {
            type: Date,
            default: Date.now
        },
        availability: {
            type: String,
            enum: ['available', 'rented'],
            default: 'available'
        },
        availableFrom: {
            type: Date,
            default: Date.now
        },
        nearByCollege: {
            name: {
                type: String,
                required: [true, 'Nearby college name is a mandatory field']
            },
            address: {
                type: String,
                required: [true, 'Nearby College address is a mandatory field'],
            }
        },
        nearBySchool: {
            name: {
                type: String,
                required: [true, 'Nearby School name is a mandatory field']
            },
            address: {
                type: String,
                required: [true, 'Nearby School address is a mandatory field'],
            }
        },
        nearByHospital: {
            name: {
                type: String,
                required: [true, 'Nearby Hospital name is a mandatory field']
            },
            address: {
                type: String,
                required: [true, 'Nearby Hospital address is a mandatory field'],
            }
        },

    }
)

module.exports = mongoose.model.properties || mongoose.model('properties', PropertySchema)
