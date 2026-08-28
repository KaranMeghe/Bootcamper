/** @format */
import mongoose, { Schema, Document } from 'mongoose';
import { IBootCamp } from '../types/bootcampType';
import validator from 'validator';
import slugify from 'slugify';
import geocoder from '../config/geocoder';

export interface IBootcampDocument extends IBootCamp, Document {}

const bootcampSchema = new Schema<IBootCamp>(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
      unique: true,
      trim: true,
      maxlength: [50, 'Name can not be more than 50 charaters'],
    },
    slug: { type: String, unique: true, lowercase: true },
    description: {
      type: String,
      required: [true, 'Please add a description'],
      maxlength: [500, 'Description can not be more than 50 characters'],
    },
    website: {
      type: String,
      match: [
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
        'Please use a valid URL with HTTP or HTTPS',
      ],
    },
    phone: {
      type: String,
      maxlength: [20, 'Phone number cannot be longer than 20 characters'],
    },
    email: {
      type: String,
      required: [true, 'A user must have an email'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    photo: {
      type: String,
      default: 'no-photo.jpg',
    },
    address: {
      type: String,
      required: [true, 'Please add an address'],
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
      },
      coordinates: {
        type: [Number],
        index: '2dsphere',
      },
      formattedAddress: String,
      street: String,
      city: String,
      state: String,
      zipcode: String,
      country: String,
    },
    careers: {
      type: [String],
      required: [true, 'Please add at least one career'],
      enum: ['Web Development', 'Mobile Development', 'UI/UX', 'Data Science', 'Business', 'Other'],
    },
    averageRating: {
      type: Number,
      min: [1, 'Rating must be at least 1'],
      max: [10, 'Rating must can not be more than 10'],
    },
    averageCost: Number,
    housing: {
      type: Boolean,
      default: false,
    },
    jobAssistance: {
      type: Boolean,
      default: false,
    },
    jobGuarantee: {
      type: Boolean,
      default: false,
    },
    acceptGi: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

// Create Bootcamp slug from name
bootcampSchema.pre('save', function () {
  this.slug = slugify(this.name, { lower: true });
});

// Geocode and create location field
bootcampSchema.pre('save', async function (next) {
  const loc = await geocoder.geocode(this.address!);

  this.location = {
    type: 'Point',
    coordinates: [loc[0].longitude as number, loc[0].latitude as number],
    formattedAddress: loc[0].formattedAddress,
    street: loc[0].streetName,
    city: loc[0].city,
    state: loc[0].stateCode,
    zipcode: loc[0].zipcode,
    country: loc[0].countryCode,
  };

  // Do not save address in DB — we have formattedAddress
  this.address = undefined as any;
});

const BootCamp = mongoose.model<IBootCamp>('BootCamp', bootcampSchema);
export default BootCamp;
