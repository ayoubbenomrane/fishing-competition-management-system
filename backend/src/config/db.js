// db.js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: 22294,
  ssl: {
    rejectUnauthorized: true,
    ca: process.env.DB_SSL_CERT || `-----BEGIN CERTIFICATE-----
MIIEQTCCAqmgAwIBAgIUM/oittoMrsXTA0lch2L2KfzY5kAwDQYJKoZIhvcNAQEM
BQAwOjE4MDYGA1UEAwwvNTNjYzkwNTQtYTdmYi00ZGRhLTg2YjYtZmY5ZjVkMzY5
MDExIFByb2plY3QgQ0EwHhcNMjQxMjE3MDYzNDE2WhcNMzQxMjE1MDYzNDE2WjA6
MTgwNgYDVQQDDC81M2NjOTA1NC1hN2ZiLTRkZGEtODZiNi1mZjlmNWQzNjkwMTEg
UHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBAM3brHwN
QEHjclcx9uWxp3Onrf8We/FeSqhbhsJq0A5B4y7PnkK4/xykW7y0jpxRvHECvVSY
tf2jqD+aBx90609Z24PPIRJJHYdVJIjo+hhgZE21a+HjBQVikBesjeSl7Xe5qcbJ
GquwXwsxG8R+yxBE3kj5ZlwEn0ifD1vwPScjuJISlDEG/5zlXQHdnraU46MSIREg
Cy4imL9o1Hd/YSV4JGqOE0Sgw9TGAx8GxDz8qFZYncLUc7gX2AW0mL6Tr6urplTa
9UZ3SJ+GL3y9AwBGM9RAZZXWgUByaYNvGKj5xkLpA3h9m6qkUpU0nEejqsBvbma3
WupVzjeCEbf2q8KdeBamkXoQI2anSJlhxV/RUtgLqkakJA4WEYZFa+fDI5z7akRy
Cc5oX1NBQjSZW/NsY4MUqvNQC1BCWtfBEomdqRNmF4Y9s7r6Pv6oaMlshpx3y2Qq
oPmXWzIAilE0qqMDDh/FEQLZkIQmEC5+JvUTqr4y5CM0tgtyf02TnDHIwQIDAQAB
oz8wPTAdBgNVHQ4EFgQUZ4lxXzu8FgWlXNlQkpPjGikazYowDwYDVR0TBAgwBgEB
/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBAD7cYsvs48LA2CL7
mP/m4vhgc1jE7ny96lmu2XZ4XXy2kIUSj9dbUUmCXS1+qbQ5S7XYr9yXRohRPBXh
Giro5X5e++RSVkRqjYecms6Ow8973JvictqPcg4rdr2gtoYZlSsydCYjMQ6pctLK
QHxhzleh4I8K42lTXeXHNVYMF8WGmOGryeCrcn+perX03FjQOj49635Z9dsRCw2X
Nx4CC06dAJbbLk5rr9IBBIK3RGRQkF2cLNkIhFrE9D9aOBjLxWAAvt4ZOXyOMauv
zGuJ46DLrAFHwzb5VPn0qzjuM2gTMne6Y7D7AVt0XWiPXf65Ur02aigclaUIsFeM
bSHx0PD3pbHxlrgWtxImjuw9E6OcruH+dvcsGnHYu5pFvhBq4qJiM6mg389fKDmy
u8mCrgGo//KhAZ+DsaFk+Uq8uTLl9k9O2yC74FEU7Oz69ij0QFmLA6EbQC2uO+D+
ZfM7fd4xeRvlCAQAO1zKL+aDNa0UrcYjivxULK6HpRjlbmvhNw==
-----END CERTIFICATE-----`
  },
});


module.exports = {
  query: (text, params) => pool.query(text, params),
};