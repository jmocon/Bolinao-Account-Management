-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 02, 2023 at 08:26 AM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 8.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `account_management`
--

-- --------------------------------------------------------

--
-- Table structure for table `bank`
--

CREATE TABLE `bank` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `abbr` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bank`
--

INSERT INTO `bank` (`id`, `name`, `abbr`) VALUES
(1, 'Metrobank', 'MBTC'),
(2, 'Banco de Oro', 'BDO'),
(3, 'EastWest Bank', 'ewb'),
(4, 'Bank of the Philippine Islands', 'BPI'),
(5, '', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `bank_account`
--

CREATE TABLE `bank_account` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `bank_id` int(11) NOT NULL,
  `account_number` varchar(100) DEFAULT NULL,
  `account_name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bank_account`
--

INSERT INTO `bank_account` (`id`, `name`, `bank_id`, `account_number`, `account_name`) VALUES
(1, 'BSSC-A', 1, '2787278811227', 'Bolinao Storage Services Corporation'),
(2, 'BSSC-B', 1, '2787278811537', 'Raquel M. Young-Arboleda or Alyanna Lloyd T. Arboleda'),
(3, 'BSSC-SD', 4, '200009107157', 'Bolinao Storage Services Corporation'),
(4, 'BSSC-EGOV', 1, NULL, 'Bolinao Storage Services Corporation'),
(5, 'WP/STN-A', 1, '2787278811162', 'Bolinao Agro Resource Incorporated'),
(6, 'WP/STN-B', 1, '2787278811529', 'Raquel M. Young-Arboleda or Alyanna Lloyd T. Arboleda');

-- --------------------------------------------------------

--
-- Table structure for table `check`
--

CREATE TABLE `check` (
  `id` int(11) NOT NULL,
  `bank_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `check`
--

INSERT INTO `check` (`id`, `bank_id`, `name`) VALUES
(10, 1, 'Metrobank Format 1'),
(11, 2, 'BDO Format 2');

-- --------------------------------------------------------

--
-- Table structure for table `check_format`
--

CREATE TABLE `check_format` (
  `id` int(11) NOT NULL,
  `check_id` int(11) NOT NULL,
  `type` varchar(20) NOT NULL,
  `x` int(11) NOT NULL,
  `y` int(11) NOT NULL,
  `font_size` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `check_format`
--

INSERT INTO `check_format` (`id`, `check_id`, `type`, `x`, `y`, `font_size`) VALUES
(11, 10, 'checkDate', 30, 10, 0),
(12, 10, 'checkPayee', 30, 30, 0),
(13, 10, 'amount', 30, 70, 0),
(14, 10, 'amountInWords', 30, 90, 0),
(15, 10, 'voucherCode', 30, 50, 0),
(16, 11, 'checkDate', 10, 10, 0),
(17, 11, 'checkPayee', 10, 30, 0),
(18, 11, 'amount', 10, 70, 0),
(19, 11, 'amountInWords', 10, 90, 0),
(20, 11, 'voucherCode', 10, 50, 0);

-- --------------------------------------------------------

--
-- Table structure for table `company`
--

CREATE TABLE `company` (
  `id` int(11) NOT NULL,
  `code` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `address` varchar(250) NOT NULL,
  `tin` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `company`
--

INSERT INTO `company` (`id`, `code`, `name`, `address`, `tin`) VALUES
(1, 'BSSC', 'Bolinao Storage Service Corporation', '403 Road 10, Nbbs Navotas City', '00890012800000'),
(2, 'WP', 'Bolinao Agro Resources Inc.', 'Brgy Luna Bolinao Pangasinan', '21467742900003'),
(3, 'STN', 'Bolinao Agro Resources Inc.', 'Brgy Luna Bolinao Pangasinan', '21467742900003'),
(4, 'BARI M', 'Bolinao Agro Resources Inc.', '37A Banawe St Brgy Lourdes Quezon City', '21467742900000'),
(5, 'BARI B', 'Bolinao Agro Resources Inc.', 'Brgy Luna Bolinao Pangasinan', '21467742900003');

-- --------------------------------------------------------

--
-- Table structure for table `deposit`
--

CREATE TABLE `deposit` (
  `id` int(11) NOT NULL,
  `bank_account_id` int(11) NOT NULL,
  `cleared_date` date DEFAULT NULL,
  `payee` varchar(100) NOT NULL,
  `particular` varchar(200) NOT NULL,
  `deposit_date` date NOT NULL,
  `bank_id` int(11) DEFAULT NULL,
  `mode_of_payment` tinyint(1) NOT NULL,
  `amount` decimal(10,4) NOT NULL,
  `check_number` varchar(50) DEFAULT NULL,
  `check_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `deposit`
--

INSERT INTO `deposit` (`id`, `bank_account_id`, `cleared_date`, `payee`, `particular`, `deposit_date`, `bank_id`, `mode_of_payment`, `amount`, `check_number`, `check_date`) VALUES
(2, 1, NULL, 'payee', 'particulars', '2023-05-15', 2, 1, '100.0000', NULL, NULL),
(3, 1, NULL, '132321', '123123', '2023-05-16', 1, 2, '123123.0000', '123123', '2023-06-06'),
(4, 2, '2023-09-07', '323', '234', '2023-05-08', 1, 1, '234.0000', NULL, NULL),
(5, 2, '2023-08-25', '2222', '123', '2023-05-08', 2, 1, '123.0000', NULL, NULL),
(6, 1, '2023-06-14', 'tst1', 'part1', '2023-05-01', 1, 2, '1000.0000', 'check1', '2023-06-01');

-- --------------------------------------------------------

--
-- Table structure for table `deposit_slips`
--

CREATE TABLE `deposit_slips` (
  `id` int(11) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp(),
  `date_printed` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `deposit_slips`
--

INSERT INTO `deposit_slips` (`id`, `date_created`, `date_printed`) VALUES
(8, '2023-05-24 22:09:49', '2023-06-05 22:11:48'),
(9, '2023-06-05 22:14:05', '2023-06-06 22:08:01'),
(15, '2023-06-06 05:56:56', NULL),
(16, '2023-06-06 05:58:52', '2023-06-06 05:59:25');

-- --------------------------------------------------------

--
-- Table structure for table `deposit_slip_content`
--

CREATE TABLE `deposit_slip_content` (
  `id` int(11) NOT NULL,
  `deposit_slips_id` int(11) NOT NULL,
  `deposit_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `deposit_slip_content`
--

INSERT INTO `deposit_slip_content` (`id`, `deposit_slips_id`, `deposit_id`) VALUES
(38, 8, 2),
(39, 9, 3),
(45, 15, 4),
(46, 16, 5),
(47, 16, 6);

-- --------------------------------------------------------

--
-- Table structure for table `deposit_slip_format`
--

CREATE TABLE `deposit_slip_format` (
  `id` int(11) NOT NULL,
  `bank_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `deposit_slip_format`
--

INSERT INTO `deposit_slip_format` (`id`, `bank_id`, `name`) VALUES
(1, 1, 'after width'),
(2, 2, 'BDO Format');

-- --------------------------------------------------------

--
-- Table structure for table `deposit_slip_layout`
--

CREATE TABLE `deposit_slip_layout` (
  `id` int(11) NOT NULL,
  `deposit_slip_format_id` int(11) NOT NULL,
  `type` varchar(100) NOT NULL,
  `x` int(11) DEFAULT NULL,
  `y` int(11) DEFAULT NULL,
  `margin` int(11) DEFAULT NULL,
  `letter_spacing` int(11) DEFAULT NULL,
  `font_size` int(11) DEFAULT NULL,
  `width` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `deposit_slip_layout`
--

INSERT INTO `deposit_slip_layout` (`id`, `deposit_slip_format_id`, `type`, `x`, `y`, `margin`, `letter_spacing`, `font_size`, `width`) VALUES
(1, 1, 'accountNumber', 1, 1, NULL, 1, 12, NULL),
(2, 1, 'accountName', 1, 1, NULL, NULL, 1, 1),
(3, 1, 'cashDomination', 1, 1, 1, NULL, 1, NULL),
(4, 1, 'cashPieces', 1, 1, 1, NULL, 1, NULL),
(5, 1, 'cashAmount', 1, 1, 1, NULL, 1, NULL),
(6, 1, 'cashTotal', 1, 1, NULL, NULL, 1, NULL),
(7, 1, 'checkBank', 1, 1, 1, NULL, 1, NULL),
(8, 1, 'checkNumber', 1, 11, 1, NULL, 1, NULL),
(9, 1, 'checkAmount', 1, 1, 1, NULL, 1, NULL),
(10, 1, 'checkTotal', 1, 1, NULL, NULL, 1, NULL),
(11, 1, 'grandTotal', 1, 1, NULL, NULL, 1, NULL),
(12, 2, 'accountNumber', 10, 10, NULL, 5, 12, NULL),
(13, 2, 'accountName', 10, 30, NULL, NULL, 12, 250),
(14, 2, 'cashDomination', 300, 10, -5, NULL, 12, NULL),
(15, 2, 'cashPieces', 370, 10, -5, NULL, 12, NULL),
(16, 2, 'cashAmount', 470, 10, -5, NULL, 12, NULL),
(17, 2, 'cashTotal', 470, 140, NULL, NULL, 14, NULL),
(18, 2, 'checkBank', 300, 200, -5, NULL, 12, NULL),
(19, 2, 'checkNumber', 380, 200, -5, NULL, 12, NULL),
(20, 2, 'checkAmount', 480, 200, -5, NULL, 12, NULL),
(21, 2, 'checkTotal', 480, 370, NULL, NULL, 12, NULL),
(22, 2, 'grandTotal', 480, 390, NULL, NULL, 12, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `disbursements`
--

CREATE TABLE `disbursements` (
  `id` int(11) NOT NULL,
  `company_id` int(11) DEFAULT NULL,
  `disbursement_date` date DEFAULT current_timestamp(),
  `expense_category` tinyint(1) DEFAULT NULL COMMENT '0 - DE\r\n1 - IE\r\n2 - DE-IE\r\n3 - NA',
  `non_expense_category` tinyint(1) DEFAULT NULL COMMENT '0: ''AP'', \r\n1: ''PC'', \r\n2: ''FT'', \r\n3: ''NA''',
  `supplier_id` int(11) DEFAULT NULL,
  `particulars` varchar(200) DEFAULT NULL,
  `item_code` int(11) DEFAULT NULL,
  `vatable_amount` decimal(10,4) DEFAULT NULL,
  `non_vatable_amount` decimal(10,4) DEFAULT NULL,
  `ewt_id` int(11) DEFAULT NULL,
  `ap_charge_to` varchar(50) DEFAULT NULL,
  `bank_account_id` int(11) DEFAULT NULL,
  `check_number` varchar(50) DEFAULT NULL,
  `check_date` date DEFAULT NULL,
  `cleared_date` date DEFAULT NULL,
  `status` tinyint(1) DEFAULT 0 COMMENT '0 - draft\r\n1 - pending / for approval\r\n2 - returned / For Correction\r\n3 - Approved\r\n4 - Printed''\r\n5 - Check\r\n6 - Cleared\r\n7 - Cancelled',
  `created_by` int(11) DEFAULT NULL COMMENT 'user_id',
  `approved_by` int(11) DEFAULT NULL COMMENT 'user_id'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `disbursements`
--

INSERT INTO `disbursements` (`id`, `company_id`, `disbursement_date`, `expense_category`, `non_expense_category`, `supplier_id`, `particulars`, `item_code`, `vatable_amount`, `non_vatable_amount`, `ewt_id`, `ap_charge_to`, `bank_account_id`, `check_number`, `check_date`, `cleared_date`, `status`, `created_by`, `approved_by`) VALUES
(31, 1, '2023-02-20', 0, 1, 2, 'pati test', 2, '200.0000', '300.0000', 2, '', 1, '1111112222222', '2023-02-20', NULL, 5, NULL, 31),
(32, 1, '2023-02-10', 0, 0, 2, 'asdasdasd', 2, '1000.0000', '100.0000', NULL, '', 1, '123123123', '2023-02-10', '2023-04-23', 6, NULL, 32),
(33, 1, '2023-03-04', 1, 1, 1, 'dfasdasd', 1, '100.0000', '200.0000', 3, '', 1, 'dgsdgsdfsdfs', '2023-03-17', '2023-05-21', 6, NULL, NULL),
(34, 2, '2023-03-08', 1, 1, 2, 'test camyht', 1, '5000.0000', '10000.0000', 2, '', 1, '2131241213123123', '2023-03-15', '2023-03-24', 6, NULL, NULL),
(35, 2, '2023-03-15', NULL, 1, 1, 'testing', 1, '1000.0000', '2000.0000', 1, '', 1, 'ohujfqweo324', '2023-03-15', NULL, 0, NULL, NULL),
(36, 2, '2023-05-11', 1, NULL, 2, 'party', NULL, '1000.0000', '2000.0000', 1, 'assdw', 1, '100', '2023-05-12', NULL, 4, NULL, 36),
(37, 2, '2023-05-11', 1, NULL, 2, 'party', NULL, '1000.0000', '2000.0000', 1, 'assdw', 1, '100', '2023-05-12', NULL, 7, NULL, NULL),
(38, 2, '2023-05-05', 1, 0, 2, 'party', NULL, '1000.0000', '2000.0000', 1, 'bbbb', 1, '100641612', '2023-05-06', NULL, 3, NULL, 38),
(39, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3, NULL, 39),
(44, 1, '2023-06-08', 0, 0, 1, 'dasdasd', 1, '1000.0000', '2000.0000', 2, NULL, 1, '100', '2023-06-08', '0000-00-00', 1, NULL, NULL),
(45, 1, '2023-06-08', 0, 0, 1, 'dasdasd', 1, '1000.0000', '2000.0000', 2, NULL, 1, '100', '2023-06-08', NULL, 5, NULL, 45),
(46, 1, NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3, NULL, 46),
(47, 1, NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 4, NULL, 47),
(48, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL),
(49, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3, NULL, 49),
(50, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, '2023-05-31', 6, NULL, 50),
(51, 2, '2023-06-25', 2, 3, 2, 'dasdasd', NULL, '1000.0000', NULL, NULL, NULL, 1, '123123', '2023-06-14', NULL, 2, NULL, NULL),
(55, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL),
(56, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL),
(57, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL),
(58, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL),
(59, NULL, '0000-00-00', 0, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3, 'rqwrqwr13r13r', '2023-06-12', NULL, 7, NULL, NULL),
(60, 4, '2023-09-15', 3, 3, 2, 'qewe', 2, '1000.0000', '122.0000', NULL, NULL, 1, 'asdasdasdasds', '2023-09-02', '2023-09-02', 6, NULL, 60),
(61, 2, '2023-08-30', 0, 3, 1, 'sfa', 2, '100.0000', '200.0000', NULL, NULL, 3, '123', '2023-08-30', NULL, 7, NULL, 61),
(62, 2, '2023-08-24', 3, 0, 1, 'no', 2, '1000.0000', '200.0000', 2, 'him', 3, '123', '2023-08-30', NULL, 4, NULL, 62);

-- --------------------------------------------------------

--
-- Table structure for table `ewt`
--

CREATE TABLE `ewt` (
  `id` int(11) NOT NULL,
  `tax_type` varchar(10) NOT NULL,
  `description` varchar(200) NOT NULL,
  `tax_rate` decimal(10,4) DEFAULT NULL,
  `atc` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ewt`
--

INSERT INTO `ewt` (`id`, `tax_type`, `description`, `tax_rate`, `atc`) VALUES
(1, 'WE', 'RENTAL', '5.0000', 'WC100'),
(2, 'WE', 'RENTAL', '5.0000', 'WI100'),
(3, 'WE', 'SERVICES', '2.0000', 'WC160'),
(4, 'WE', 'SERVICES', '2.0000', 'WI160'),
(5, 'WE', 'PURCHASE OF GOODS', '1.0000', 'WC158'),
(6, 'WE', 'PURCHASE OF GOODS', '1.0000', 'WI158'),
(7, 'N/A', 'N/A', '0.0000', 'NONE');

-- --------------------------------------------------------

--
-- Table structure for table `expenses`
--

CREATE TABLE `expenses` (
  `id` int(11) NOT NULL,
  `company_id` int(11) DEFAULT NULL,
  `expense_date` date DEFAULT current_timestamp(),
  `expense_category` tinyint(1) DEFAULT NULL COMMENT '0 - DE\r\n1 - IE\r\n2 - DE-IE\r\n3 - NA',
  `supplier_id` int(11) DEFAULT NULL,
  `particulars` varchar(200) DEFAULT NULL,
  `invoice_date` date DEFAULT NULL,
  `invoice_number` varchar(100) DEFAULT NULL,
  `item_code` int(11) DEFAULT NULL,
  `vatable_amount` decimal(10,4) DEFAULT NULL,
  `non_vatable_amount` decimal(10,4) DEFAULT NULL,
  `ewt_id` int(11) DEFAULT NULL,
  `mode_of_payment` tinyint(4) DEFAULT NULL,
  `remarks` varchar(250) DEFAULT NULL,
  `status` tinyint(1) DEFAULT 0 COMMENT '0 - draft\r\n1 - pending / for approval\r\n2 - returned / For Correction\r\n3 - Approved\r\n4 - Printed''\r\n5 - Check\r\n6 - Cleared\r\n7 - Cancelled',
  `created_by` int(11) DEFAULT NULL COMMENT 'user_id',
  `approved_by` int(11) DEFAULT NULL COMMENT 'user_id'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `expenses`
--

INSERT INTO `expenses` (`id`, `company_id`, `expense_date`, `expense_category`, `supplier_id`, `particulars`, `invoice_date`, `invoice_number`, `item_code`, `vatable_amount`, `non_vatable_amount`, `ewt_id`, `mode_of_payment`, `remarks`, `status`, `created_by`, `approved_by`) VALUES
(3, 1, '2023-05-01', 1, 1, '121212', '2023-05-24', '22222222', 1, '1000.0000', '2000.0000', 5, 2, '3333333333333', 4, NULL, 3),
(5, 2, '2023-09-07', 1, 2, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, 3, NULL, 5);

-- --------------------------------------------------------

--
-- Table structure for table `item_code`
--

CREATE TABLE `item_code` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `item_code`
--

INSERT INTO `item_code` (`id`, `name`) VALUES
(1, 'Payroll'),
(2, 'Diesel'),
(3, 'Permit'),
(4, 'Miscellaneous'),
(5, 'R&M'),
(6, 'Lease'),
(7, 'Government Tax'),
(8, 'Water'),
(9, 'Electricity'),
(10, 'Communication'),
(11, 'Sf & Pt'),
(12, 'T&S'),
(13, 'Benefits'),
(14, 'Cash Advance'),
(15, 'Dir Adv'),
(16, 'Management Fee'),
(19, 'test');

-- --------------------------------------------------------

--
-- Table structure for table `supplier`
--

CREATE TABLE `supplier` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `address` varchar(250) DEFAULT NULL,
  `tin` varchar(20) DEFAULT NULL,
  `contact_number` varchar(50) DEFAULT NULL,
  `check_payee` varchar(100) DEFAULT NULL,
  `bank_id` int(11) DEFAULT NULL,
  `account_number` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `supplier`
--

INSERT INTO `supplier` (`id`, `name`, `address`, `tin`, `contact_number`, `check_payee`, `bank_id`, `account_number`) VALUES
(1, 'Philippine Fisheries Development Authority', 'Navotas Fishport Complex Northbay Blvd Nbbs Navotas City', '00080375200001', NULL, 'Philippine Fisheries Development Authority', NULL, NULL),
(2, 'Smart Communications Inc', 'Smart Tower 6799 Ayala Ave Makati City', '00190167300000', NULL, 'Smart Communications Inc', NULL, NULL),
(3, 'Pldt Inc', 'Ramon Cojuangco Bldg Makati Ave Makati City', '00048879300000', NULL, 'Pldt Inc', NULL, NULL),
(4, 'Sapian Star Security & Investigation Agency, Inc', '2/F Retail Master Bldg West Bank Road Brgy Sta Ana Taytay Rizal', '00025571500000', NULL, 'Sapian Star Security & Investigation Agency, Inc', NULL, NULL),
(5, 'Central Pangasinan Electric Cooperative, Inc.', 'Padilla St San Carlos City Pangasinan', '00062141800000', NULL, 'Central Pangasinan Electric Cooperative, Inc.', NULL, NULL),
(6, 'Imelda Naraval', 'Concordia, Bolinao, Pangasinan', '', NULL, 'Imelda Naraval', NULL, NULL),
(7, 'Maynilad Water Services', 'Engg Bldg Mwss Cmpd Katipunan Ave Balara Quezon City', '00539344200000', NULL, 'Maynilad Water Services', NULL, NULL),
(8, 'Arnie Lim Maravilla', '33 Gov Pascual Ave Concepcion Malabon City', '91637705800000', NULL, 'Arnie Lim Maravilla', NULL, NULL),
(9, 'Mayekawa Philippines Corporation', '4/F Unit A&B Suntree Tower 13 Meralco Ave Brgy San Antonio Pasig', '00022475600000', NULL, 'Mayekawa Philippines Corporation', NULL, NULL),
(10, 'Dcn Cable Tv', 'Senior Santiago St Concordia Bolinao Pangasinan', '19892071700000', NULL, 'Dcn Cable Tv', NULL, NULL),
(11, 'Rizal Mills Corporation', '230 Dasmarinas St Cor Et Yuchengco St Brgy 291 Zone 27 Binondo Manila', '20135252400000', NULL, 'Rizal Mills Corporation', NULL, NULL),
(12, 'Simpp Gasoline Station / Liwanag Quisay', '382 Brgy Liwa Liwa Bolinao Pangasinan', '94390115400000', NULL, 'Simpp Gasoline Station', NULL, NULL),
(13, 'Mjc', 'Paitan West Sual Pangasinan', '93728914200000', NULL, 'Mylene S Cardinal', NULL, NULL),
(14, 'Jomic Printing Services', '52 Mh Del Pilar St San Antonio Sfdm Quezon City', '18688802500000', NULL, 'Jomic Printing Services', NULL, NULL),
(15, 'Arvin International Marketing, Inc.', 'Purok 3 Brgy Gahonon Daet Camarines Norte', '21526191100000', NULL, 'Arvin International Marketing, Inc.', NULL, NULL),
(16, 'Lubri-Chem Philippines Distributors, Inc.', '38 Gen Malvar St Brgy 137 Caloocan City', '00460869100000', NULL, 'Lubri-Chem Philippines Distributors, Inc.', NULL, NULL),
(17, 'Phil-Whashin Industrial Corp', '25 Pagatpat St Veterans Village Proj 7 Quezon City', '21676180300000', NULL, 'Phil-Whashin Industrial Corp', NULL, NULL),
(18, 'Bssc-A', '', '', NULL, 'Bolinao Storage Services Corporation', NULL, NULL),
(19, 'Bssc-B', '', '', NULL, 'Raquel M. Young-Arboleda', NULL, NULL),
(20, 'Wp/Stn-A', '', '', NULL, 'Bolinao Agro Resources Incorporated', NULL, NULL),
(21, 'Wp/Stn-B', '', '', NULL, 'Raquel M. Young-Arboleda', NULL, NULL),
(22, 'Hiadvance Philippines Inc.', '', '', NULL, 'Hiadvance Philippines Inc.', NULL, NULL),
(23, 'Meralco', '', '', NULL, 'Meralco', NULL, NULL),
(24, 'Raquel M. Young', '', '', NULL, 'Raquel M. Young', NULL, NULL),
(25, 'Raquel M. Young-Arboleda', '', '', NULL, 'Raquel M. Young-Arboleda', NULL, NULL),
(26, 'Bolinao Agro Resources Inc.', '', '', NULL, 'Bolinao Agro Resources Inc.', NULL, NULL),
(27, 'Handling Innovation Inc.', '19 Dowjones Bldg West Service Rd Sucat Brgy Marcelo Green Village Paranaque City', '215-862-002-00000', NULL, 'Handling Innovation Inc.', NULL, NULL),
(28, 'East Banaue Motor Parts Corp', '', '', NULL, 'East Banaue Motor Parts Corp', NULL, NULL),
(29, 'Buildmate', '186-A Novo Bldg Mc Arthur Highway Karuhatan Valenzuela', '', NULL, 'Buildmate', NULL, NULL),
(30, 'Bssc-Union', '', '', NULL, 'Bolinao Storage Services Corporation', NULL, NULL),
(31, 'Fastkil Pest Control Services And Trading Corp', '2546 Nakar St San Andres Manila City', '008-147-122-00000', NULL, 'Fastkil Pest Control Services And Trading Corp', NULL, NULL),
(32, 'Stellite Commercial Inc.', '', '', NULL, 'Stellite Commercial Inc.', NULL, NULL),
(33, 'Online Transfer', '', '', NULL, 'Online Transfer', NULL, NULL),
(34, 'Jopers Enterprises Inc.', '', '', NULL, 'Jopers Enterprises Inc.', NULL, NULL),
(35, 'Sylvester Pokajam', '', '', NULL, 'Maria Isabel Natividad', NULL, NULL),
(36, 'Augusto C. Natividad', '', '', NULL, 'Augusto C. Natividad', NULL, NULL),
(38, '11111', 'zxczxc', 'asdasd', 'qweqwe', 'asfas', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `middle_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `suffix_name` varchar(20) DEFAULT NULL,
  `birth_date` date DEFAULT NULL,
  `gender` tinyint(1) DEFAULT 0 COMMENT '0 - male\r\n1 - female',
  `contact_number` varchar(100) DEFAULT NULL,
  `home_address` varchar(200) DEFAULT NULL,
  `email_address` varchar(100) DEFAULT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `reset_password` varchar(100) DEFAULT NULL,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp(),
  `is_archived` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `role_id`, `first_name`, `middle_name`, `last_name`, `suffix_name`, `birth_date`, `gender`, `contact_number`, `home_address`, `email_address`, `username`, `password`, `reset_password`, `date_created`, `is_archived`) VALUES
(9, 2, 'asd', 'asd', 'asd', 'asd', '2023-05-11', 1, 'asd', 'asd', 'asd', 'asd', '', '3351213488feb9377cc33d052ad4b3de', '2023-05-17 21:41:11', 0),
(10, 1, 'Alyanna', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'alyanna@email.com', 'username', '7ec833a032e8c315feb6591bb7aa92a6', '9d6e3751ee8b4638e6dc172b4599cdbf', '2023-05-27 13:59:04', 0),
(11, 1, 'fname', 'mname', 'lname', 'sname', '2023-05-17', NULL, 'cnumber', 'hadd', 'email@add.com', 'username2', '7ec833a032e8c315feb6591bb7aa92a6', NULL, '2023-05-27 14:14:28', 0);

-- --------------------------------------------------------

--
-- Table structure for table `voucher`
--

CREATE TABLE `voucher` (
  `id` int(11) NOT NULL,
  `disbursement_id` int(11) NOT NULL,
  `code` varchar(50) NOT NULL,
  `counter` int(11) NOT NULL,
  `date_created` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `voucher`
--

INSERT INTO `voucher` (`id`, `disbursement_id`, `code`, `counter`, `date_created`) VALUES
(14, 31, 'BSSC-A', 6, '2023-02-26 10:14:42'),
(15, 32, 'BSSC-EGOV', 1, '2023-02-26 17:14:26'),
(19, 34, 'BSSC-A', 7, '2023-03-08 19:31:33'),
(20, 33, 'BSSC-SD', 1, '2023-03-09 22:30:10'),
(21, 35, 'BSSC-A', 8, '2023-03-14 16:45:19'),
(22, 36, 'BSSC-A', 9, '2023-06-06 13:12:59'),
(23, 47, 'undefined', 1, '2023-06-09 06:11:41'),
(24, 50, 'BSSC-A', 10, '2023-06-09 06:34:31'),
(25, 45, 'BSSC-A', 11, '2023-06-09 06:36:05'),
(26, 62, 'BSSC-SD', 2, '2023-08-31 05:51:49'),
(27, 61, 'BSSC-SD', 3, '2023-08-31 06:15:12'),
(28, 60, 'BSSC-A', 12, '2023-09-01 06:32:01');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bank`
--
ALTER TABLE `bank`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bank_account`
--
ALTER TABLE `bank_account`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `check`
--
ALTER TABLE `check`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `check_format`
--
ALTER TABLE `check_format`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `company`
--
ALTER TABLE `company`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `deposit`
--
ALTER TABLE `deposit`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `deposit_slips`
--
ALTER TABLE `deposit_slips`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `deposit_slip_content`
--
ALTER TABLE `deposit_slip_content`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `deposit_slip_format`
--
ALTER TABLE `deposit_slip_format`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `deposit_slip_layout`
--
ALTER TABLE `deposit_slip_layout`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `disbursements`
--
ALTER TABLE `disbursements`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ewt`
--
ALTER TABLE `ewt`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `expenses`
--
ALTER TABLE `expenses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `item_code`
--
ALTER TABLE `item_code`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `supplier`
--
ALTER TABLE `supplier`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `voucher`
--
ALTER TABLE `voucher`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bank`
--
ALTER TABLE `bank`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `bank_account`
--
ALTER TABLE `bank_account`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `check`
--
ALTER TABLE `check`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `check_format`
--
ALTER TABLE `check_format`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `company`
--
ALTER TABLE `company`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `deposit`
--
ALTER TABLE `deposit`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `deposit_slips`
--
ALTER TABLE `deposit_slips`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `deposit_slip_content`
--
ALTER TABLE `deposit_slip_content`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT for table `deposit_slip_format`
--
ALTER TABLE `deposit_slip_format`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `deposit_slip_layout`
--
ALTER TABLE `deposit_slip_layout`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `disbursements`
--
ALTER TABLE `disbursements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT for table `ewt`
--
ALTER TABLE `ewt`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `expenses`
--
ALTER TABLE `expenses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `item_code`
--
ALTER TABLE `item_code`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `supplier`
--
ALTER TABLE `supplier`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `voucher`
--
ALTER TABLE `voucher`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
