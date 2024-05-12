const { number } = require('joi');
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  removed: {
    type: Boolean,
    default: false,
  },

  enabled: {
    type: Boolean,
    default: true,
  },

  name: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },

  accountName: {
    type: String,
    trim: true
  },
  number: {
    type: String,
    unique: true,
  },
  legalName: {
    type: String,
    trim: true,
  },
  hasParentCompany: {
    type: Boolean,
    default: false,
  },
  parentCompany: {
    type: mongoose.Schema.ObjectId,
    ref: 'Company',
  },
  isClient: {
    type: Boolean,
    default: false,
  },
  peoples: [{ type: mongoose.Schema.ObjectId, ref: 'People', autopopulate: true }],
  mainContact: { type: mongoose.Schema.ObjectId, ref: 'People', autopopulate: true },
  icon: {
    type: String,
    trim: true,
  },
  logo: {
    type: String,
    trim: true,
  },
  imageHeader: String,
  bankName: {
    type: String,
    trim: true,
  },
  bankIban: {
    type: String,
    trim: true,
  },
  bankSwift: {
    type: String,
    trim: true,
  },
  bankNumber: {
    type: String,
    trim: true,
  },
  bankRouting: {
    type: String,
    trim: true,
  },
  bankCountry: {
    type: String,
    trim: true,
  },
  companyRegNumber: {
    type: String,
    trim: true,
  },
  companyTaxNumber: {
    type: String,
    trim: true,
  },
  companyTaxId: {
    type: String,
    trim: true,
  },
  companyRegId: {
    type: String,
    trim: true,
  },
  securitySocialNbr: String,
  customField: [
    {
      fieldName: {
        type: String,
        trim: true,
        lowercase: true,
      },
      fieldType: {
        type: String,
        trim: true,
        lowercase: true,
        default: 'string',
      },
      fieldValue: {},
    },
  ],
  card_type: {
    type: String,
    trim: true,
    lowercase: true,
  },
  card: {
    type: String,
    trim: true,
    lowercase: true,
    default: 'string',
  } , expire: {
    type: String,
    trim: true,
    lowercase: true,
    default: 'string',
  }, expire_date: {
    type: Date,
   
  },
  auto_pay: {
    type: String,
    trim: true,
    lowercase: true,
    default: 'string',
  },
  eft_hold_date: {
    type: String,
    trim: true,
    lowercase: true,
    default: 'string',
  },
  print_cyles: {
    type: String,
    trim: true,
    lowercase: true,
    default: 'string',
  }
,
  payment : { 


},
  location: {
    latitude: Number,
    longitude: Number,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  State: {
    type: String,
  },
  postalCode: {
    type: Number,
  },
  country: {
    type: String,
    trim: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  otherPhone: [
    {
      type: String,
      trim: true,
    },
  ],
  fax: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
  },
  otherEmail: [
    {
      type: String,
      trim: true,
      lowercase: true,
    },
  ],
  website: {
    type: String,
    trim: true,
    lowercase: true,
  },
  socialMedia: {
    facebook: String,
    instagram: String,
    twitter: String,
    linkedin: String,
    tiktok: String,
    youtube: String,
    snapchat: String,
  },
  images: [
    {
      id: String,
      name: String,
      path: String,
      description: String,
      isPublic: {
        type: Boolean,
        default: false,
      },
    },
  ],
  files: [
    {
      id: String,
      name: String,
      path: String,
      description: String,
      isPublic: {
        type: Boolean,
        default: false,
      },
    },
  ],
  category: String,
  approved: {
    type: Boolean,
    default: true,
  },
  verified: {
    type: Boolean,
  },
  notes: String,
  tags: [
    {
      type: String,
      trim: true,
      lowercase: true,
    },
  ],
  created: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date,
    default: Date.now,
  },
  isPublic: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
  },
});

schema.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model('Company', schema);
