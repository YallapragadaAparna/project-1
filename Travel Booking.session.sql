-- Create the database
CREATE DATABASE IF NOT EXISTS travel_booking;

-- Use the database
USE travel_booking;

/*CREATE TABLE IF NOT EXISTS users (
  username VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
 email VARCHAR(255) NOT NULL UNIQUE,
  role ENUM('admin', 'customer') DEFAULT 'customer',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);*/ 
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  reset_token VARCHAR(255) NULL,
  reset_token_expiry BIGINT NULL,
  role ENUM('admin', 'customer') DEFAULT 'customer',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS flights (
  FlightName VARCHAR(100) NOT NULL,
  FlightCode VARCHAR(20) NOT NULL,
  DepartingCity VARCHAR(100) NOT NULL,
  DepartingTime DATETIME NOT NULL,
  ArrivingCity VARCHAR(100) NOT NULL,
  ArrivingTime DATETIME NOT NULL,
  Duration VARCHAR(50),
  Price DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  admin_name VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  airport_code VARCHAR(10) NOT NULL,
  airport_name VARCHAR(100) NOT NULL,
  city VARCHAR(100) NOT NULL,
  country VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  FlightCode VARCHAR(20) NOT NULL,
  trip_type VARCHAR(20),
  booking_date DATE NOT NULL,
  return_date DATE,
  total_passengers INT,
  contact_name VARCHAR(100),
  contact_email VARCHAR(100),
  contact_phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS passengers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  booking_id INT NOT NULL,
  name VARCHAR(100),
  age INT,
  gender ENUM('Male', 'Female', 'Other'),
  relation VARCHAR(50),
  FOREIGN KEY (booking_id) REFERENCES bookings(id)
);
CREATE TABLE IF NOT EXISTS login_logs (
  username VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  login_time DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS admin_logs (
  admin_name VARCHAR(100) NOT NULL,
  password VARCHAR(255) NOT NULL,
  login_time DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE forgot_password_users (
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  reset_token VARCHAR(255),
  reset_token_expiry BIGINT
);

