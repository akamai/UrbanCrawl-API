-- MySQL dump 10.16  Distrib 10.2.12-MariaDB, for osx10.12 (x86_64)
--
-- Host: localhost    Database: urbancrawl
-- ------------------------------------------------------
-- Server version	10.2.12-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Role`
--

DROP TABLE IF EXISTS `Role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(512) NOT NULL,
  `description` varchar(512) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `modified` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Role`
--

LOCK TABLES `Role` WRITE;
/*!40000 ALTER TABLE `Role` DISABLE KEYS */;
/*!40000 ALTER TABLE `Role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `RoleMapping`
--

DROP TABLE IF EXISTS `RoleMapping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `RoleMapping` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `principalType` varchar(512) DEFAULT NULL,
  `principalId` varchar(255) DEFAULT NULL,
  `roleId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `principalId` (`principalId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RoleMapping`
--

LOCK TABLES `RoleMapping` WRITE;
/*!40000 ALTER TABLE `RoleMapping` DISABLE KEYS */;
/*!40000 ALTER TABLE `RoleMapping` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `accesstoken`
--

DROP TABLE IF EXISTS `accesstoken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `accesstoken` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `ttl` int(11) DEFAULT 1209600 COMMENT 'time to live in seconds (2 weeks by default)',
  `scopes` text DEFAULT NULL COMMENT 'Array of scopes granted to this access token.',
  `created` date DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=162 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accesstoken`
--

LOCK TABLES `accesstoken` WRITE;
/*!40000 ALTER TABLE `accesstoken` DISABLE KEYS */;
INSERT INTO `accesstoken` (`id`, `ttl`, `scopes`, `created`, `userId`) VALUES (1,1209600,NULL,'2018-03-30',21);
INSERT INTO `accesstoken` (`id`, `ttl`, `scopes`, `created`, `userId`) VALUES (2,1209600,NULL,'2018-03-30',21);
INSERT INTO `accesstoken` (`id`, `ttl`, `scopes`, `created`, `userId`) VALUES (4,1209600,NULL,'2018-03-30',21);
INSERT INTO `accesstoken` (`id`, `ttl`, `scopes`, `created`, `userId`) VALUES (5,1209600,NULL,'2018-03-30',21);
INSERT INTO `accesstoken` (`id`, `ttl`, `scopes`, `created`, `userId`) VALUES (11,1209600,NULL,'2018-03-30',41);
INSERT INTO `accesstoken` (`id`, `ttl`, `scopes`, `created`, `userId`) VALUES (21,1209600,NULL,'2018-03-30',21);
INSERT INTO `accesstoken` (`id`, `ttl`, `scopes`, `created`, `userId`) VALUES (31,1209600,NULL,'2018-03-30',21);
INSERT INTO `accesstoken` (`id`, `ttl`, `scopes`, `created`, `userId`) VALUES (41,1209600,NULL,'2018-03-30',21);
INSERT INTO `accesstoken` (`id`, `ttl`, `scopes`, `created`, `userId`) VALUES (51,1209600,NULL,'2018-03-30',21);
INSERT INTO `accesstoken` (`id`, `ttl`, `scopes`, `created`, `userId`) VALUES (61,1209600,NULL,'2018-03-30',21);
INSERT INTO `accesstoken` (`id`, `ttl`, `scopes`, `created`, `userId`) VALUES (71,1209600,NULL,'2018-03-30',21);
INSERT INTO `accesstoken` (`id`, `ttl`, `scopes`, `created`, `userId`) VALUES (81,1209600,NULL,'2018-03-30',21);
INSERT INTO `accesstoken` (`id`, `ttl`, `scopes`, `created`, `userId`) VALUES (91,1209600,NULL,'2018-03-30',21);
INSERT INTO `accesstoken` (`id`, `ttl`, `scopes`, `created`, `userId`) VALUES (101,1209600,NULL,'2018-03-30',21);
INSERT INTO `accesstoken` (`id`, `ttl`, `scopes`, `created`, `userId`) VALUES (111,1209600,NULL,'2018-03-30',21);
INSERT INTO `accesstoken` (`id`, `ttl`, `scopes`, `created`, `userId`) VALUES (131,1209600,NULL,'2018-03-31',21);
INSERT INTO `accesstoken` (`id`, `ttl`, `scopes`, `created`, `userId`) VALUES (141,1209600,NULL,'2018-04-03',21);
INSERT INTO `accesstoken` (`id`, `ttl`, `scopes`, `created`, `userId`) VALUES (151,1209600,NULL,'2018-04-03',21);
INSERT INTO `accesstoken` (`id`, `ttl`, `scopes`, `created`, `userId`) VALUES (161,1209600,NULL,'2018-05-24',51);
/*!40000 ALTER TABLE `accesstoken` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `account` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `userid` text DEFAULT NULL,
  `email` text DEFAULT NULL,
  `full_name` text DEFAULT NULL,
  `password` text DEFAULT NULL,
  `createdate` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=221 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `acl`
--

DROP TABLE IF EXISTS `acl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `acl` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `accessType` text DEFAULT NULL,
  `permission` text DEFAULT NULL,
  `principalType` text DEFAULT NULL,
  `principalId` text DEFAULT NULL,
  `model` text DEFAULT NULL,
  `property` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acl`
--

LOCK TABLES `acl` WRITE;
/*!40000 ALTER TABLE `acl` DISABLE KEYS */;
/*!40000 ALTER TABLE `acl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cart` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `cityid` int(11) DEFAULT NULL,
  `userid` text DEFAULT NULL,
  `thumburl` text DEFAULT NULL,
  `unitprice` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `totalprice` int(11) DEFAULT NULL,
  `createdate` date DEFAULT NULL,
  `updatedate` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `city`
--

DROP TABLE IF EXISTS `city`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `city` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `countryname` varchar(50) DEFAULT NULL,
  `lat` float DEFAULT NULL,
  `lng` float DEFAULT NULL,
  `thumburl` varchar(200) DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `createdate` datetime DEFAULT NULL,
  `lastupdated` datetime DEFAULT NULL,
  `heroimage` varchar(200) DEFAULT NULL,
  `budget` varchar(30) DEFAULT NULL,
  `besttime` varchar(50) DEFAULT NULL,
  `language` varchar(20) DEFAULT NULL,
  `population` varchar(15) DEFAULT NULL,
  `traveladvice` varchar(200) DEFAULT NULL,
  `currency` varchar(20) DEFAULT NULL,
  `tour_price` int(3) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=105 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `city`
--

LOCK TABLES `city` WRITE;
/*!40000 ALTER TABLE `city` DISABLE KEYS */;
INSERT INTO `city` (`id`, `name`, `countryname`, `lat`, `lng`, `thumburl`, `description`, `createdate`, `lastupdated`, `heroimage`, `budget`, `besttime`, `language`, `population`, `traveladvice`, `currency`, `tour_price`) VALUES (44,'Boston','USA',42.3144,-70.9703,'http://static.urbancrawlapp.com/img/Boston/Boston-Skyline-iStock-469769544.jpg','Boston is one of the oldest cities in the United States, founded on the Shawmut Peninsula in 1630 by Puritan settlers from England.\nIt was the scene of several key events of the American Revolution, such as the Boston Massacre, the Boston Tea Party, the Battle of Bunker Hill, and the Siege of Boston. Upon U.S. independence from Great Britain, it continued to be an important port and manufacturing hub as well as a center for education and culture.\nThe city has expanded beyond the original peninsula through land reclamation and municipal annexation. Its rich history attracts many tourists, with Faneuil Hall alone drawing more than 20 million visitors per year.\n\nBoston\'s many firsts include the United States\' first public school (Boston Latin School, 1635), first subway system (Tremont Street Subway, 1897), and first public park (Boston Common, 1634).','2017-08-20 18:47:47','2017-10-11 16:59:19','http://static.urbancrawlapp.com/img/Boston/Boston-Skyline-iStock-469769544.jpg',NULL,'9AM-11PM','English','9.845',NULL,'US Dollar',25);
INSERT INTO `city` (`id`, `name`, `countryname`, `lat`, `lng`, `thumburl`, `description`, `createdate`, `lastupdated`, `heroimage`, `budget`, `besttime`, `language`, `population`, `traveladvice`, `currency`, `tour_price`) VALUES (54,'Dubai','UAE',25.0753,55.2277,'http://static.urbancrawlapp.com/img/Dubai/Skyline-iStock-844946954.jpg','Dubai is the largest and most populous city in the United Arab Emirates (UAE). It is located on the southeast coast of the Persian Gulf and is the capital of the Emirate of Dubai, one of the seven emirates that make up the country. Abu Dhabi and Dubai are the only two emirates to have veto power over critical matters of national importance in the country\'s Federal Supreme Council.\nThe city of Dubai is located on the emirate\'s northern coastline and heads the Dubai-Sharjah-Ajman metropolitan area. Dubai will host World Expo 2020\n\nDubai emerged as a global city and business hub of the Middle East. It is also a major transport hub for passengers and cargo. By the 1960s, Dubai\'s economy was based on revenues from trade and, to a smaller extent, oil exploration concessions, but oil was not discovered until 1966. Oil revenue first started to flow in 1969. Dubai\'s oil revenue helped accelerate the early development of the city, but its reserves are limited and production levels are low.','2017-08-20 16:50:36','2017-10-11 16:59:22','http://static.urbancrawlapp.com/img/Dubai/Skyline-iStock-844946954.jpg',NULL,'9AM-11PM','English','8.456',NULL,'US Dollar',35);
INSERT INTO `city` (`id`, `name`, `countryname`, `lat`, `lng`, `thumburl`, `description`, `createdate`, `lastupdated`, `heroimage`, `budget`, `besttime`, `language`, `population`, `traveladvice`, `currency`, `tour_price`) VALUES (64,'London','UK',51.5286,-0.101599,'http://static.urbancrawlapp.com/img/London/Skyline-iStock-529576471.jpg','London is the capital and most populous city of England and the United Kingdom.\n\nStanding on the River Thames in the south east of the island of Great Britain, London has been a major settlement for two millennia. It was founded by the Romans, who named it Londinium.\nLondon\'s ancient core, the City of London, largely retains its 1.12-square-mile (2.9 km2) medieval boundaries. Since at least the 19th century, \"London\" has also referred to the metropolis around this core, historically split between Middlesex, Essex, Surrey, Kent, and Hertfordshire, which today largely makes up Greater London, a region governed by the Mayor of London and the London Assembly.','2017-08-20 19:17:30','2017-10-11 16:59:25','http://static.urbancrawlapp.com/img/London/Skyline-iStock-529576471.jpg',NULL,'9AM-11PM','English','7.894',NULL,'US Dollar',45);
INSERT INTO `city` (`id`, `name`, `countryname`, `lat`, `lng`, `thumburl`, `description`, `createdate`, `lastupdated`, `heroimage`, `budget`, `besttime`, `language`, `population`, `traveladvice`, `currency`, `tour_price`) VALUES (74,'Paris','France',48.8589,2.34706,'http://static.urbancrawlapp.com/img/Paris/Paris-Skyline-Stock-636333586.jpg','Paris is the capital and most populous city of France, with an administrative-limits area of 105 square kilometres (41 square miles) and a 2015 population of 2,229,621.\n\nThe city is a commune and department, and the capital-heart of the 12,012-square-kilometre (4,638-square-mile) Île-de-France region (colloquially known as the \'Paris Region\'), whose 12,142,802 2016 population represents roughly 18 percent of the population of France.\nBy the 17th century, Paris had become one of Europe\'s major centres of finance, commerce, fashion, science, and the arts, a position that it retains still today.\nThe Paris Region had a GDP of €649.6 billion (US $763.4 billion) in 2014, accounting for 30.4 percent of the GDP of France.\nAccording to official estimates, in 2013-14 the Paris Region had the third-highest GDP in the world and the largest regional GDP in the EU.','2017-08-20 19:17:30','2017-10-11 16:59:28','http://static.urbancrawlapp.com/img/Paris/Paris-Skyline-Stock-636333586.jpg',NULL,'9AM-11PM','English','9.456',NULL,'US Dollar',55);
INSERT INTO `city` (`id`, `name`, `countryname`, `lat`, `lng`, `thumburl`, `description`, `createdate`, `lastupdated`, `heroimage`, `budget`, `besttime`, `language`, `population`, `traveladvice`, `currency`, `tour_price`) VALUES (84,'Rio De Janeiro','Brazil',-22.9139,-43.7262,'http://static.urbancrawlapp.com/img/RioDeJaneiro/Skyline-iStock-518230906.jpg','Rio de Janeiro (River of January), or simply Rio, is the second-most populous municipality in Brazil and the sixth-most populous in the Americas.\nThe metropolis is anchor to the Rio de Janeiro metropolitan area, the second-most populous metropolitan area in Brazil and sixth-most populous in the Americas.\nRio de Janeiro the capital of the state of Rio de Janeiro, Brazil\'s third-most populous state. Part of the city has been designated as a World Heritage Site, named \"Rio de Janeiro: Carioca Landscapes between the Mountain and the Sea\", by UNESCO on 1 July 2012 as a Cultural Landscape.','2017-08-20 19:17:30','2017-10-11 16:59:31','http://static.urbancrawlapp.com/img/RioDeJaneiro/Skyline-iStock-518230906.jpg',NULL,'9AM-11PM','English','7.258',NULL,'US Dollar',65);
INSERT INTO `city` (`id`, `name`, `countryname`, `lat`, `lng`, `thumburl`, `description`, `createdate`, `lastupdated`, `heroimage`, `budget`, `besttime`, `language`, `population`, `traveladvice`, `currency`, `tour_price`) VALUES (94,'San Francisco','USA',37.7577,-122.438,'http://static.urbancrawlapp.com/img/SanFrancisco/Skyline-iStock-800813068.jpg','San Francisco (Spanish for Saint Francis), officially the City and County of San Francisco, is the cultural, commercial, and financial center of Northern California.\nThe consolidated city-county covers an area of about 47.9 square miles (124 km2)[18] at the north end of the San Francisco Peninsula in the San Francisco Bay Area. It is the fourth-most populous city in California, and the 13th-most populous in the United States, with a 2016 census-estimated population of 870,887. The population is projected to reach 1 million by 2033.\n\nSan Francisco was founded on June 29, 1776, when colonists from Spain established Presidio of San Francisco at the Golden Gate and Mission San Francisco de Asís a few miles away, all named for St. Francis of Assisi. The California Gold Rush of 1849 brought rapid growth, making it the largest city on the West Coast at the time.','2017-08-20 19:17:30','2017-10-11 16:59:35','http://static.urbancrawlapp.com/img/SanFrancisco/Skyline-iStock-800813068.jpg',NULL,'9AM-11PM','English','8.258',NULL,'US Dollar',75);
INSERT INTO `city` (`id`, `name`, `countryname`, `lat`, `lng`, `thumburl`, `description`, `createdate`, `lastupdated`, `heroimage`, `budget`, `besttime`, `language`, `population`, `traveladvice`, `currency`, `tour_price`) VALUES (104,'Singapore','Singapore',1.34374,103.684,'http://static.urbancrawlapp.com/img/Singapore/Skyline-iStock-519029103.jpg','Singapore, officially the Republic of Singapore, sometimes referred to as the \"Lion City\", the \"Garden City\" or the \"Little Red Dot\", is a sovereign city-state in Southeast Asia. It lies one degree (137 km) north of the equator, at the southern tip of the Malay Peninsula, with Indonesia\'s Riau Islands to the south.\nSingapore\'s territory consists of one main island along with 62 other islets. Since independence, extensive land reclamation has increased its total size by 23% (130 km2) and its greening policy has covered the densely populated island with tropical flora, parks and gardens.\n\nStamford Raffles founded colonial Singapore in 1819 as a trading post of the East India Company, but after its collapse and the eventual establishment of the British Raj, the islands were ceded to Britain and became part of its Straits Settlements in 1826. During the Second World War, Singapore was occupied by Japan.','2017-08-20 19:17:30','2017-10-11 16:59:38','http://static.urbancrawlapp.com/img/Singapore/Skyline-iStock-519029103.jpg',NULL,'9AM-11PM','English','9.145',NULL,'British Pound',85);
/*!40000 ALTER TABLE `city` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `keypairs`
--

DROP TABLE IF EXISTS `keypairs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `keypairs` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `public_key` text DEFAULT NULL,
  `private_key` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1502 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `keypairs`
--

LOCK TABLES `keypairs` WRITE;
/*!40000 ALTER TABLE `keypairs` DISABLE KEYS */;
INSERT INTO `keypairs` (`id`, `public_key`, `private_key`) VALUES (1501,'-----BEGIN RSA PUBLIC KEY-----\nMIIBCgKCAQEAycInrUOtU72VqBezE+kwJvqQv9Q6mhpLIEArHcfIoaQETe1aze2bvv651tTK\nh67lQzdd/trkUzSLLGTjoDQM5kqTJ1LHqoc2yQYj51YrOaysLJL143ePH8vH/SvZzumSIKLV\nZeETWqNY33LOW04RiEH6N6wkmM/mbCUMiBYIOEhvsjCD14gkEf/n3WXMmyG0SN7fPHeWQ1EW\nC26wqPHuL/mvy779M2YdBbeh9jq50cuF43NROkjA8H2e6PdG37STptLDhX9CFMgjeKB/cdwl\ngySY9hfhGNHxWgcC+dMahq3T3fbnz5w4YTC+d60dgW9MwDl3vnJqnkgZrCvTXjLS+QIDAQAB\n-----END RSA PUBLIC KEY-----\n','-----BEGIN RSA PRIVATE KEY-----\nMIIEpAIBAAKCAQEAycInrUOtU72VqBezE+kwJvqQv9Q6mhpLIEArHcfIoaQETe1aze2bvv65\n1tTKh67lQzdd/trkUzSLLGTjoDQM5kqTJ1LHqoc2yQYj51YrOaysLJL143ePH8vH/SvZzumS\nIKLVZeETWqNY33LOW04RiEH6N6wkmM/mbCUMiBYIOEhvsjCD14gkEf/n3WXMmyG0SN7fPHeW\nQ1EWC26wqPHuL/mvy779M2YdBbeh9jq50cuF43NROkjA8H2e6PdG37STptLDhX9CFMgjeKB/\ncdwlgySY9hfhGNHxWgcC+dMahq3T3fbnz5w4YTC+d60dgW9MwDl3vnJqnkgZrCvTXjLS+QID\nAQABAoIBAQDGAwdtxT4XMbnvf1MB95qKpt/pZSEenS+eN1wZnjoKai7PTGQSN2Dj0pwRfEZJ\nZB0eGvjlZ28vOiJdL6c3U95VJlvF/Dh55LqgEKasJKXHtPBFzvYEiRKu4hElKCRcLmB8J1PI\n6V1VV3uh0cs1USlj0V0BxrEkSOacvL/Pz8/Ba5broxAPrDPgPtnabRWMoi6vs6SdHR1xeHRi\nBWK1aqmu4GbNhdoSi3aGH3jLTLUbaZew1TSib8e0PXvLvaHkBu6ckKFYpKHo4H4UEijH9esD\nz41EvArQcCJ55hO22XxgLK1qphj2ZQ2N7QSj5dp7njkYzPvzUGgwr4jpwEo6m0ABAoGBAPRu\nwVG1rNkXdTU8bWgijWrPpnJ97P9lNb7trXrZT5bPQBXCgd0p49vsqOlLerr5Nlky/DYDUV0T\npY4J70UWqv1EdYrdKrDI+RP9D2mO5uA2OVMu36m08quMINDeGQXP+LYOY5QakhcPHCADxaCh\nfG9eY7PIJ/DDb0MvvVBotLEZAoGBANNOaVqvwQq882nuYSYWiuF5VqgHYt+pSpGZESzqlPjF\nz602Zv9Vxv6LV5PQ7+Hm+tyZnazzktw0cwDJZ9txP8Uc061ppNP7DQ8EzLQ47vRSi21vTUv5\nKXM7pvgrmEDOfQXGEq0As4Hp60eGE06i1+igOAHcAUKTLKsU+eUMhgzhAoGBAAlKaGitqhs6\nTAcw+8uYfJ2RtPbnGGoAs9FFAXII7oCB8iKhmQQKApIqZaUwbELNFCbBzFpVN/N8uq8ya3jJ\nysgDoSAdFfFQQj9jQAG4H8hn5zflMTUnHo4srlaiCntxEzgARgKsG99qgJwq6IkZejxVbx63\nPeVl2EXKe7yhrjSJAoGAbcTVDAwzLx3bIVN5Wizptpmu/5jeryullh87AedWvikcanHRbaEk\nv8SpGRu4EdVIymJuu5LI3uXMPENkVWXuZ7pC6FnyC0Dmlr+6i4Dr+TYMQixIrkfgVYFOiqsy\n66+Y2O/9cavklH9s/vnSe84ydSEOF0Ev0mLcGH/MFUW9OWECgYAz3glu7110M7wdkwDMCa03\nQ0RufRM8x+J5fosAD+6FXUsIySNrRBsJK77CVnRsDBjRrBEFLhwuBTSWBopnPVafx7PUUp4b\niQOsSUSYFByggBKS8c6Fcp4achmrU7to6gA2dEMFNqGxIdpWQd0R729kSx98wIhk5kQCnp+/\n92Momg==\n-----END RSA PRIVATE KEY-----\n');
/*!40000 ALTER TABLE `keypairs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `media`
--

DROP TABLE IF EXISTS `media`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `media` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `url` varchar(350) DEFAULT NULL,
  `type` varchar(5) DEFAULT NULL,
  `cityid` int(11) DEFAULT NULL,
  `placeid` int(11) DEFAULT NULL,
  `createdate` datetime DEFAULT NULL,
  `lastupdated` datetime DEFAULT NULL,
  `caption` varchar(400) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1672 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `media`
--

LOCK TABLES `media` WRITE;
/*!40000 ALTER TABLE `media` DISABLE KEYS */;
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (81,'http://static.urbancrawlapp.com/img/Boston/AcornStreet/Acorn-Street-iStock-497250190.jpg','image',44,34,'2017-11-19 07:18:42','2017-11-19 07:19:05',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (91,'http://static.urbancrawlapp.com/img/Boston/AcornStreet/Acorn-Street-iStock-497252678.jpg','image',44,34,'2017-11-19 07:18:46','2017-11-19 07:19:11',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (101,'http://static.urbancrawlapp.com/img/Boston/AcornStreet/Acorn-Street-iStock-618359860.jpg','image',44,34,'2017-11-19 07:18:49','2017-11-19 07:19:14',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (111,'http://static.urbancrawlapp.com/img/Boston/BostonLight/Boston-Light iStock-157198486.jpg','image',44,44,'2017-11-19 07:18:52','2017-11-19 07:19:17',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (121,'http://static.urbancrawlapp.com/img/Boston/BostonLight/Boston-Light-iStock-172796490.jpg','image',44,44,'2017-11-19 07:18:55','2017-11-19 07:19:20',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (131,'http://static.urbancrawlapp.com/img/Boston/BostonLight/Boston-Light-iStock-586086046.jpg','image',44,44,'2017-11-19 07:18:58','2017-11-19 07:19:23',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (161,'http://static.urbancrawlapp.com/img/Boston/FaneuilHall/Faneuil-Hall-iStock-497439812.jpg','image',44,54,'2017-11-19 07:22:52','2017-11-19 07:22:52',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (171,'http://static.urbancrawlapp.com/img/Boston/FaneuilHall/Faneuil-Hall-iStock-504710633.jpg','image',44,54,'2017-11-19 07:22:52','2017-11-19 07:22:52',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (181,'http://static.urbancrawlapp.com/img/Boston/FaneuilHall/Faneuil-Hall-iStock-94998807.jpg','image',44,54,'2017-11-19 07:22:52','2017-11-19 07:22:52',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (201,'http://static.urbancrawlapp.com/img/Boston/FortPointChannel/Fort-Point-Channel-iStock-184274943.jpg','image',44,64,'2017-11-19 07:32:35','2017-11-19 07:32:35',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (211,'http://static.urbancrawlapp.com/img/Boston/FortPointChannel/Fort-Point-Channel-iStock-184274945.jpg','image',44,64,'2017-11-19 07:32:35','2017-11-19 07:32:35',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (221,'http://static.urbancrawlapp.com/img/Boston/FortPointChannel/Fort-Point-Channel-iStock-668681038.jpg','image',44,64,'2017-11-19 07:32:35','2017-11-19 07:32:35',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (241,'http://static.urbancrawlapp.com/img/Boston/Harvard/Harvard-iStock-157332318.jpg','image',44,71,'2017-11-19 07:32:35','2017-11-19 07:32:35',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (251,'http://static.urbancrawlapp.com/img/Boston/Harvard/Harvard-iStock-182874107.jpg','image',44,71,'2017-11-19 07:32:35','2017-11-19 07:32:35',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (261,'http://static.urbancrawlapp.com/img/Boston/Harvard/Harvard-iStock-683709204.jpg','image',44,71,'2017-11-19 07:32:35','2017-11-19 07:32:35',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (271,'http://static.urbancrawlapp.com/img/Boston/NorthBankWalkway/North-Bank-Walkway-and-Zakim-Bridgei-Stock-175495514.jpg','image',44,81,'2017-11-19 07:32:35','2017-11-19 07:32:35',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (291,'http://static.urbancrawlapp.com/img/Boston/NorthBankWalkway/Zakim-Bridge-iStock-157564763.jpg','image',44,81,'2017-11-19 07:32:35','2017-11-19 07:32:35',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (301,'http://static.urbancrawlapp.com/img/Boston/NorthBankWalkway/Zakim-Bridge-iStock-628364594.jpg','image',44,81,'2017-11-19 07:32:35','2017-11-19 07:32:35',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (321,'http://static.urbancrawlapp.com/img/Dubai/AlMamzarBeach/Al-Mamzar-Beach-iStock-671656508.jpg','image',54,91,'2017-11-20 14:41:32','2017-11-20 14:41:32',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (331,'http://static.urbancrawlapp.com/img/Dubai/AlMamzarBeach/Al-Mamzar-Beach-iStock-680882590.jpg','image',54,91,'2017-11-20 14:41:32','2017-11-20 14:41:32',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (351,'http://static.urbancrawlapp.com/img/Dubai/BurjAlArab/Burj-Al-Arab-iStock-182817377.jpg','image',54,101,'2017-11-20 14:41:32','2017-11-20 14:41:32',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (361,'http://static.urbancrawlapp.com/img/Dubai/BurjAlArab/Burj-Al-Arab-iStock-493882137.jpg','image',54,101,'2017-11-20 14:41:32','2017-11-20 14:41:32',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (371,'http://static.urbancrawlapp.com/img/Dubai/BurjAlArab/Burj-Al-Arab-iStock-512277914.jpg','image',54,101,'2017-11-20 14:41:32','2017-11-20 14:41:32',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (391,'http://static.urbancrawlapp.com/img/Dubai/BurjKhalifa/Burj-Khalifa-iStock-183371461.jpg','image',54,111,'2017-11-20 14:41:32','2017-11-20 14:41:32',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (401,'http://static.urbancrawlapp.com/img/Dubai/BurjKhalifa/Burj-Khalifa-iStock-543206368.jpg','image',54,111,'2017-11-20 14:41:32','2017-11-20 14:41:32',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (411,'http://static.urbancrawlapp.com/img/Dubai/BurjKhalifa/Burj-Khalifa-iStock-840575882.jpg','image',54,111,'2017-11-20 14:41:32','2017-11-20 14:41:32',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (431,'http://static.urbancrawlapp.com/img/Dubai/DubaiCreek/Dubai-Creek-iStock-494852943.jpg','image',54,121,'2017-11-20 14:41:32','2017-11-20 14:41:32',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (441,'http://static.urbancrawlapp.com/img/Dubai/DubaiCreek/Dubai-Creek-iStock-518207982.jpg','image',54,121,'2017-11-20 14:41:32','2017-11-20 14:41:32',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (451,'http://static.urbancrawlapp.com/img/Dubai/DubaiCreek/Dubai-Creek-iStock-664775800.jpg','image',54,121,'2017-11-20 14:41:32','2017-11-20 14:41:32',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (471,'http://static.urbancrawlapp.com/img/Dubai/DubaiMarina/Dubai-Marina-iStock-465112536.jpg','image',54,131,'2017-11-20 14:41:32','2017-11-20 14:41:32',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (481,'http://static.urbancrawlapp.com/img/Dubai/DubaiMarina/Dubai-Marina-iStock-519381461.jpg','image',54,131,'2017-11-20 14:41:32','2017-11-20 14:41:32',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (491,'http://static.urbancrawlapp.com/img/Dubai/DubaiMarina/Dubai-MarinaiStock-633690700.jpg','image',54,131,'2017-11-20 14:41:32','2017-11-20 14:41:32',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (511,'http://static.urbancrawlapp.com/img/Dubai/PalmJumeirah/Palm-Jumeirah-iStock-119928387.jpg','image',54,141,'2017-11-20 14:41:32','2017-11-20 14:41:32',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (521,'http://static.urbancrawlapp.com/img/Dubai/PalmJumeirah/Palm-Jumeirah-iStock-502007826.jpg','image',54,141,'2017-11-20 14:41:32','2017-11-20 14:41:32',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (531,'http://static.urbancrawlapp.com/img/Dubai/PalmJumeirah/Palm-Jumeirah-iStock-692019206.jpg','image',54,141,'2017-11-20 14:41:32','2017-11-20 14:41:32',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (551,'http://static.urbancrawlapp.com/img/London/BigBen/Big-Ben-iStock-155392163.jpg','image',64,151,'2017-11-20 14:49:14','2017-11-20 14:49:14',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (561,'http://static.urbancrawlapp.com/img/London/BigBen/Big-Ben-iStock-486105932.jpg','image',64,151,'2017-11-20 14:49:14','2017-11-20 14:49:14',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (571,'http://static.urbancrawlapp.com/img/London/BigBen/Big-Ben-iStock-636712428.jpg','image',64,151,'2017-11-20 14:49:14','2017-11-20 14:49:14',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (591,'http://static.urbancrawlapp.com/img/London/LondonEye/London-Eye-iStock-524898202.jpg','image',64,161,'2017-11-20 14:49:14','2017-11-20 14:49:14',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (601,'http://static.urbancrawlapp.com/img/London/LondonEye/London-Eye-iStock-538053722.jpg','image',64,161,'2017-11-20 14:49:14','2017-11-20 14:49:14',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (621,'http://static.urbancrawlapp.com/img/London/StJamesPark/St-James\'s-Park-iStock-174357340.jpg','image',64,171,'2017-11-20 14:49:14','2017-11-20 14:49:14',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (631,'http://static.urbancrawlapp.com/img/London/StJamesPark/St-James\'s-Park-iStock-177259448.jpg','image',64,171,'2017-11-20 14:49:14','2017-11-20 14:49:14',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (641,'http://static.urbancrawlapp.com/img/London/StJamesPark/St-James-ParkiStock-527219774.jpg','image',64,171,'2017-11-20 14:49:14','2017-11-20 14:49:14',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (661,'http://static.urbancrawlapp.com/img/London/TheShard/The-Shard-iStock-482667566.jpg','image',64,181,'2017-11-20 14:49:14','2017-11-20 14:49:14',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (671,'http://static.urbancrawlapp.com/img/London/TheShard/The-Shard-iStock-482667568.jpg','image',64,181,'2017-11-20 14:49:14','2017-11-20 14:49:14',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (681,'http://static.urbancrawlapp.com/img/London/TheShard/The-Shard-iStock-500577125.jpg','image',64,181,'2017-11-20 14:49:14','2017-11-20 14:49:14',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (701,'http://static.urbancrawlapp.com/img/London/TowerBridge/Tower-Bridge-iStock-177027393.jpg','image',64,191,'2017-11-20 14:49:14','2017-11-20 14:49:14',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (711,'http://static.urbancrawlapp.com/img/London/TowerBridge/Tower-Bridge-iStock-450435855.jpg','image',64,191,'2017-11-20 14:49:14','2017-11-20 14:49:14',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (721,'http://static.urbancrawlapp.com/img/London/TowerBridge/Tower-Bridge-iStock-504483796.jpg','image',64,191,'2017-11-20 14:49:14','2017-11-20 14:49:14',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (741,'http://static.urbancrawlapp.com/img/London/TrafalgarSquare/Trafalgar-Square-iStock-182183348.jpg','image',64,201,'2017-11-20 14:49:14','2017-11-20 14:49:14',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (751,'http://static.urbancrawlapp.com/img/London/TrafalgarSquare/Trafalgar-Square-iStock-182489724.jpg','image',64,201,'2017-11-20 14:49:14','2017-11-20 14:49:14',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (761,'http://static.urbancrawlapp.com/img/London/TrafalgarSquare/Trafalgar-Square-iStock-525609635.jpg','image',64,201,'2017-11-20 14:49:14','2017-11-20 14:49:14',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (781,'http://static.urbancrawlapp.com/img/Paris/ArcDeTriomphe/Arc-de-Triomphe-iStock-497102234.jpg','image',74,211,'2017-11-20 16:34:10','2017-11-20 16:34:10',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (791,'http://static.urbancrawlapp.com/img/Paris/ArcDeTriomphe/Arc-de-Triomphe-iStock-516529419.jpg','image',74,211,'2017-11-20 16:34:10','2017-11-20 16:34:10',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (801,'http://static.urbancrawlapp.com/img/Paris/ArcDeTriomphe/Arc-de-Triomphe-iStock-576563448.jpg','image',74,211,'2017-11-20 16:34:10','2017-11-20 16:34:10',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (821,'http://static.urbancrawlapp.com/img/Paris/EiffelTower/Eiffel-Tower-iStock-183036930.jpg','image',74,221,'2017-11-20 16:34:10','2017-11-20 16:34:10',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (831,'http://static.urbancrawlapp.com/img/Paris/EiffelTower/Eiffel-Tower-iStock-534705319.jpg','image',74,221,'2017-11-20 16:34:10','2017-11-20 16:34:10',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (841,'http://static.urbancrawlapp.com/img/Paris/EiffelTower/Eiffel-Tower-iStock-538996253.jpg','image',74,221,'2017-11-20 16:34:10','2017-11-20 16:34:10',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (861,'http://static.urbancrawlapp.com/img/Paris/JardinDesTuileries/Jardin-des-Tuileries-iStock-133768888.jpg','image',74,231,'2017-11-20 16:34:10','2017-11-20 16:34:10',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (871,'http://static.urbancrawlapp.com/img/Paris/JardinDesTuileries/Jardin-des-Tuileries-iStock-586744704.jpg','image',74,231,'2017-11-20 16:34:10','2017-11-20 16:34:10',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (891,'http://static.urbancrawlapp.com/img/Paris/LuxembourgPalace/Luxembourg-Palace-iStock-139996348.jpg','image',74,241,'2017-11-20 16:34:10','2017-11-20 16:34:10',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (901,'http://static.urbancrawlapp.com/img/Paris/LuxembourgPalace/Luxembourg-Palace-iStock-151514883.jpg','image',74,241,'2017-11-20 16:34:10','2017-11-20 16:34:10',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (911,'http://static.urbancrawlapp.com/img/Paris/LuxembourgPalace/Luxembourg-Palace-iStock-844226560.jpg','image',74,241,'2017-11-20 16:34:10','2017-11-20 16:34:10',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (931,'http://static.urbancrawlapp.com/img/Paris/Montmartre/Montmartre-iStock-177018864.jpg','image',74,251,'2017-11-20 16:34:10','2017-11-20 16:34:10',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (941,'http://static.urbancrawlapp.com/img/Paris/Montmartre/Montmartre-iStock-538614723.jpg','image',74,251,'2017-11-20 16:34:10','2017-11-20 16:34:10',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (951,'http://static.urbancrawlapp.com/img/Paris/Montmartre/Montmartre-iStock-613768610.jpg','image',74,251,'2017-11-20 16:34:10','2017-11-20 16:34:10',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (961,'http://static.urbancrawlapp.com/img/Paris/MuseeDOrsay/Musee-d\'Orsay-iStock-600066932.jpg','image',74,261,'2017-11-20 16:34:10','2017-11-20 16:34:10',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (981,'http://static.urbancrawlapp.com/img/Paris/MuseeDOrsay/Musée-d’Orsay-iStock-134547820.jpg','image',74,261,'2017-11-20 16:34:10','2017-11-20 16:34:10',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (991,'http://static.urbancrawlapp.com/img/Paris/MuseeDOrsay/Musée-d’Orsay-iStock-598219616.jpg','image',74,261,'2017-11-20 16:34:10','2017-11-20 16:34:10',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (1011,'http://static.urbancrawlapp.com/img/RioDeJaneiro/CariocaAqueduct/Carioca-Aqueduct-iStock-641284292.jpg','image',84,271,'2017-11-20 16:57:30','2017-11-20 16:57:30',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (1021,'http://static.urbancrawlapp.com/img/RioDeJaneiro/CariocaAqueduct/Carioca-Aqueduct-iStock-665228332.jpg','image',84,271,'2017-11-20 16:57:30','2017-11-20 16:57:30',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (1031,'http://static.urbancrawlapp.com/img/RioDeJaneiro/CariocaAqueduct/Carioca-Aqueduct-iStock-842952796.jpg','image',84,271,'2017-11-20 16:57:30','2017-11-20 16:57:30',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (1041,'http://static.urbancrawlapp.com/img/RioDeJaneiro/CopacabanaBeach/Copacabana Beach-iStock-458892905.jpg','image',84,281,'2017-11-20 16:57:30','2017-11-20 16:57:30',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (1061,'http://static.urbancrawlapp.com/img/RioDeJaneiro/CopacabanaBeach/Copacabana-Beach-iStock-507966400.jpg','image',84,281,'2017-11-20 16:57:30','2017-11-20 16:57:30',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (1071,'http://static.urbancrawlapp.com/img/RioDeJaneiro/CopacabanaBeach/Copacabana-Beach-iStock-545356656.jpg','image',84,281,'2017-11-20 16:57:30','2017-11-20 16:57:30',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (1091,'http://static.urbancrawlapp.com/img/RioDeJaneiro/IpanemaBeach/Ipanema-Beach-iStock-477543208.jpg','image',84,291,'2017-11-20 16:57:30','2017-11-20 16:57:30',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (1101,'http://static.urbancrawlapp.com/img/RioDeJaneiro/IpanemaBeach/Ipanema-Beach-iStock-827154646.jpg','image',84,291,'2017-11-20 16:57:30','2017-11-20 16:57:30',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (1111,'http://static.urbancrawlapp.com/img/RioDeJaneiro/IpanemaBeach/Ipanema-iStock-157436364.jpg','image',84,291,'2017-11-20 16:57:30','2017-11-20 16:57:30',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (1121,'http://static.urbancrawlapp.com/img/RioDeJaneiro/PedraDaGavea/Pedra-da-Gavea-iStock-505141811.jpg','image',84,301,'2017-11-20 16:57:30','2017-11-20 16:57:30',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (1141,'http://static.urbancrawlapp.com/img/RioDeJaneiro/PedraDaGavea/Pedra-da-Gávea-iStock-505141811.jpg','image',84,301,'2017-11-20 16:57:30','2017-11-20 16:57:30',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (1151,'http://static.urbancrawlapp.com/img/RioDeJaneiro/PedraDaGavea/Pedra-da-Gávea-iStock-506401231.jpg','image',84,301,'2017-11-20 16:57:30','2017-11-20 16:57:30',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (1171,'http://static.urbancrawlapp.com/img/RioDeJaneiro/SugarloafMountain/Sugarloaf-Mountain-iStock-518803466.jpg','image',84,311,'2017-11-20 16:57:30','2017-11-20 16:57:30',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (1181,'http://static.urbancrawlapp.com/img/RioDeJaneiro/SugarloafMountain/Sugarloaf-Mountain-iStock-816466758.jpg','image',84,311,'2017-11-20 16:57:30','2017-11-20 16:57:30',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (1201,'http://static.urbancrawlapp.com/img/RioDeJaneiro/TijucaForest/Tijuca-Forest-iStock-163087765.jpg','image',84,321,'2017-11-20 16:57:30','2017-11-20 16:57:30',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (1211,'http://static.urbancrawlapp.com/img/RioDeJaneiro/TijucaForest/Tijuca-Forest-iStock-174847213.jpg','image',84,321,'2017-11-20 16:57:30','2017-11-20 16:57:30',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (1231,'http://static.urbancrawlapp.com/img/SanFrancisco/Chinatown/Chinatown-iStock-182854265.jpg','image',94,331,'2017-11-20 17:05:16','2017-11-20 17:05:16',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (1241,'http://static.urbancrawlapp.com/img/SanFrancisco/Chinatown/Chinatown-iStock-183842254.jpg','image',94,331,'2017-11-20 17:05:16','2017-11-20 17:05:16',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (1251,'http://static.urbancrawlapp.com/img/SanFrancisco/Chinatown/Chinatown-iStock-494033452.jpg','image',94,331,'2017-11-20 17:05:16','2017-11-20 17:05:16',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (1271,'http://static.urbancrawlapp.com/img/SanFrancisco/CoitTower/Coit-Tower-iStock-146073005.jpg','image',94,341,'2017-11-20 17:05:16','2017-11-20 17:05:16',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (1281,'http://static.urbancrawlapp.com/img/SanFrancisco/CoitTower/Coit-Tower-iStock-484770882.jpg','image',94,341,'2017-11-20 17:05:16','2017-11-20 17:05:16',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (1291,'http://static.urbancrawlapp.com/img/SanFrancisco/CoitTower/Coit-Tower-iStock-503075906.jpg','image',94,341,'2017-11-20 17:05:16','2017-11-20 17:05:16',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (1311,'http://static.urbancrawlapp.com/img/SanFrancisco/FerryBuilding/Ferry-Building-iStock-175205593.jpg','image',94,351,'2017-11-20 17:05:16','2017-11-20 17:05:16',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (1321,'http://static.urbancrawlapp.com/img/SanFrancisco/FerryBuilding/Ferry-Building-iStock-629531110.jpg','image',94,351,'2017-11-20 17:05:16','2017-11-20 17:05:16',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (1331,'http://static.urbancrawlapp.com/img/SanFrancisco/FerryBuilding/Ferry-Building-iStock-659748698.jpg','image',94,351,'2017-11-20 17:05:16','2017-11-20 17:05:16',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (1351,'http://static.urbancrawlapp.com/img/SanFrancisco/GoldenGateBridge/Golden-Gate-Bridge-iStock-177770941.jpg','image',94,361,'2017-11-20 17:05:16','2017-11-20 17:05:16',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (1361,'http://static.urbancrawlapp.com/img/SanFrancisco/GoldenGateBridge/Golden-Gate-Bridge-iStock-585151822.jpg','image',94,361,'2017-11-20 17:05:16','2017-11-20 17:05:16',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (1371,'http://static.urbancrawlapp.com/img/SanFrancisco/GoldenGateBridge/Golden-Gate-Bridge-iStock-625783148.jpg','image',94,361,'2017-11-20 17:05:16','2017-11-20 17:05:16',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (1391,'http://static.urbancrawlapp.com/img/SanFrancisco/LombardStreet/Lombard-Street-iStock-182204824.jpg','image',94,371,'2017-11-20 17:05:16','2017-11-20 17:05:16',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (1401,'http://static.urbancrawlapp.com/img/SanFrancisco/LombardStreet/Lombard-Street-iStock-186826837.jpg','image',94,371,'2017-11-20 17:05:16','2017-11-20 17:05:16',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (1411,'http://static.urbancrawlapp.com/img/SanFrancisco/LombardStreet/Lombard-Street-iStock-637414144.jpg','image',94,371,'2017-11-20 17:05:16','2017-11-20 17:05:16',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (1431,'http://static.urbancrawlapp.com/img/SanFrancisco/PalaceOfFineArts/Palace-of-Fine-Arts-iStock-161842200.jpg','image',94,381,'2017-11-20 17:05:16','2017-11-20 17:05:16',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (1441,'http://static.urbancrawlapp.com/img/SanFrancisco/PalaceOfFineArts/Palace-of-Fine-Arts-iStock-829919012.jpg','image',94,381,'2017-11-20 17:05:16','2017-11-20 17:05:16',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (1451,'http://static.urbancrawlapp.com/img/SanFrancisco/PalaceOfFineArts/Palace-of-Fine-Arts-iStock-92930387.jpg','image',94,381,'2017-11-20 17:05:16','2017-11-20 17:05:16',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (1461,'http://static.urbancrawlapp.com/img/Singapore/ClarkeQuay/Clarke Quay-iStock-496601845.jpg','image',104,391,'2017-11-20 17:11:30','2017-11-20 17:11:30',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (1481,'http://static.urbancrawlapp.com/img/Singapore/ClarkeQuay/Clarke-Quay-iStock-471752476.jpg','image',104,391,'2017-11-20 17:11:30','2017-11-20 17:11:30',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (1491,'http://static.urbancrawlapp.com/img/Singapore/ClarkeQuay/Clarke-Quay-iStock-520585336.jpg','image',104,391,'2017-11-20 17:11:30','2017-11-20 17:11:30',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (1511,'http://static.urbancrawlapp.com/img/Singapore/FortCanning/Fort-Canning-iStock-592022408.jpg','image',104,401,'2017-11-20 17:11:30','2017-11-20 17:11:30',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (1521,'http://static.urbancrawlapp.com/img/Singapore/FortCanning/Fort-Canning-iStock-820677994.jpg','image',104,401,'2017-11-20 17:11:30','2017-11-20 17:11:30',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (1531,'http://static.urbancrawlapp.com/img/Singapore/FortCanning/Fort-Canning-iStock-820678202.jpg','image',104,401,'2017-11-20 17:11:30','2017-11-20 17:11:30',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (1551,'http://static.urbancrawlapp.com/img/Singapore/GardenByTheBay/Garden-by-the-Bay-iStock-530563205.jpg','image',104,411,'2017-11-20 17:11:30','2017-11-20 17:11:30',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (1561,'http://static.urbancrawlapp.com/img/Singapore/GardenByTheBay/Garden-by-the-Bay-iStock-683168976.jpg','image',104,411,'2017-11-20 17:11:30','2017-11-20 17:11:30',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (1581,'http://static.urbancrawlapp.com/img/Singapore/Helix-Bridge/Helix-Bridge-iStock-164610802.jpg','image',104,421,'2017-11-20 17:11:30','2017-11-20 17:11:30',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (1591,'http://static.urbancrawlapp.com/img/Singapore/Helix-Bridge/Helix-Bridge-iStock-537925491.jpg','image',104,421,'2017-11-20 17:11:30','2017-11-20 17:11:30',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (1611,'http://static.urbancrawlapp.com/img/Singapore/Sentosa/Sentosa-iStock-139401599.jpg','image',104,431,'2017-11-20 17:11:30','2017-11-20 17:11:30',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (1621,'http://static.urbancrawlapp.com/img/Singapore/Sentosa/Sentosa-iStock-472730696.jpg','image',104,431,'2017-11-20 17:11:30','2017-11-20 17:11:30',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (1631,'http://static.urbancrawlapp.com/img/Singapore/Sentosa/Sentosa-iStock-639005972.jpg','image',104,431,'2017-11-20 17:11:30','2017-11-20 17:11:30',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (1651,'http://static.urbancrawlapp.com/img/Singapore/SingaporeFlyer/Singapore-Flyer-iStock-472064766.jpg','image',104,441,'2017-11-20 17:11:30','2017-11-20 17:11:30',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (1661,'http://static.urbancrawlapp.com/img/Singapore/SingaporeFlyer/Singapore-Flyer-iStock-506209351.jpg','image',104,441,'2017-11-20 17:11:30','2017-11-20 17:11:30',NULL);
INSERT INTO `media` (`id`, `url`, `type`, `cityid`, `placeid`, `createdate`, `lastupdated`, `caption`) VALUES (1671,'http://static.urbancrawlapp.com/img/Singapore/SingaporeFlyer/Singapore-Flyer-iStock-525559543.jpg','image',104,441,'2017-11-20 17:11:30','2017-11-20 17:11:30',NULL);
/*!40000 ALTER TABLE `media` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `orderid` text DEFAULT NULL,
  `cityid` int(11) DEFAULT NULL,
  `userid` text DEFAULT NULL,
  `thumburl` text DEFAULT NULL,
  `unitprice` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `totalprice` int(11) DEFAULT NULL,
  `createdate` date DEFAULT NULL,
  `updatedate` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=182 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
INSERT INTO `order` (`id`, `orderid`, `cityid`, `userid`, `thumburl`, `unitprice`, `quantity`, `totalprice`, `createdate`, `updatedate`) VALUES (171,'1527957308742',44,'$2b$10$2J8RWofxouA7jb2XS06ame5yaf17GlE8DIntJFbtyHrids7A1t3T.','http://static.urbancrawlapp.com/img/Boston/Boston-Skyline-iStock-469769544.jpg',25,3,75,'2018-06-02','2018-06-02');
INSERT INTO `order` (`id`, `orderid`, `cityid`, `userid`, `thumburl`, `unitprice`, `quantity`, `totalprice`, `createdate`, `updatedate`) VALUES (181,'1527957582298',44,'$2b$10$2J8RWofxouA7jb2XS06ame5yaf17GlE8DIntJFbtyHrids7A1t3T.','http://static.urbancrawlapp.com/img/Boston/Boston-Skyline-iStock-469769544.jpg',25,3,75,'2018-06-02','2018-06-02');
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `place`
--

DROP TABLE IF EXISTS `place`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `place` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `cityid` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `numimages` int(10) DEFAULT NULL,
  `timings` varchar(50) DEFAULT NULL,
  `createdate` datetime DEFAULT NULL,
  `lastupdated` datetime DEFAULT NULL,
  `heroimage` varchar(200) DEFAULT NULL,
  `herovideo` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=442 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `place`
--

LOCK TABLES `place` WRITE;
/*!40000 ALTER TABLE `place` DISABLE KEYS */;
INSERT INTO `place` (`id`, `cityid`, `name`, `description`, `numimages`, `timings`, `createdate`, `lastupdated`, `heroimage`, `herovideo`) VALUES (34,44,'Acorn Street','Nearby Louisburg Square, \"the most prestigious address\" in Beacon Hill, is Acorn Street, often mentioned as the \"most frequently photographed street in the United States.\" It is a narrow lane paved with cobblestones that was home to coachmen employed by families in Mt. Vernon and Chestnut Street mansions.',3,'Mon-Fri','2017-09-06 12:42:51','2017-10-11 16:33:00','http://static.urbancrawlapp.com/img/Boston/AcornStreet/Acorn-Street-iStock-497250190.jpg',NULL);
INSERT INTO `place` (`id`, `cityid`, `name`, `description`, `numimages`, `timings`, `createdate`, `lastupdated`, `heroimage`, `herovideo`) VALUES (44,44,'Boston Light','Boston Light is a lighthouse located on Little Brewster Island in outer Boston Harbor, Massachusetts.\nThe first lighthouse to be built on the site dates back to 1716, and was the first lighthouse to be built in what is now the United States.\nThe current lighthouse dates from 1783, is the second oldest working lighthouse in the United States (after Sandy Hook Lighthouse in New Jersey), and is the only lighthouse to still be actively staffed by the United States Coast Guard, being automated in 1998 though there is still a keeper acting as tour guide. The structure was designated a National Historic Landmark in 1964.',3,'All Days','2017-09-06 12:42:51','2017-10-11 16:33:04','http://static.urbancrawlapp.com/img/Boston/BostonLight/Boston-Light iStock-157198486.jpg',NULL);
INSERT INTO `place` (`id`, `cityid`, `name`, `description`, `numimages`, `timings`, `createdate`, `lastupdated`, `heroimage`, `herovideo`) VALUES (54,44,'Faneuil Hall','Faneuil Hall, located near the waterfront and today\'s Government Center, in Boston, Massachusetts, has been a marketplace and a meeting hall since 1743.\nIt was the site of several speeches by Samuel Adams, James Otis, and others encouraging independence from Great Britain. Now it is part of Boston National Historical Park and a well-known stop on the Freedom Trail. It is sometimes referred to as \"the Cradle of Liberty\".\n\nIn 2008, Faneuil Hall was rated number 4 in America\'s 25 Most Visited Tourist Sites by Forbes Traveler.',3,'All Days','2017-09-06 12:47:19','2017-10-11 16:33:08','http://static.urbancrawlapp.com/img/Boston/FaneuilHall/Faneuil-Hall-iStock-497439812.jpg',NULL);
INSERT INTO `place` (`id`, `cityid`, `name`, `description`, `numimages`, `timings`, `createdate`, `lastupdated`, `heroimage`, `herovideo`) VALUES (64,44,'Fort Point Channel','Fort Point Channel is a maritime channel separating South Boston from downtown Boston, Massachusetts, feeding into Boston Harbor.\nThe south part of it has been gradually filled in for use by the South Bay rail yard and several highways (specifically the Central Artery and the Southeast Expressway).\nAt its south end, the channel once widened into South Bay, from which the Roxbury Canal continued southwest where the Massachusetts Avenue Connector is now.\nThe Boston Tea Party occurred at its northern end. The channel is surrounded by the Fort Point neighborhood, which is also named after the same colonial-era fort.',3,'All Days','2017-09-06 12:47:19','2017-10-11 16:34:04','http://static.urbancrawlapp.com/img/Boston/FortPointChannel/Fort-Point-Channel-iStock-184274943.jpg',NULL);
INSERT INTO `place` (`id`, `cityid`, `name`, `description`, `numimages`, `timings`, `createdate`, `lastupdated`, `heroimage`, `herovideo`) VALUES (71,44,'Harvard University','Harvard University is a private Ivy League research university in Cambridge, Massachusetts, established in 1636, whose history, influence, and wealth have made it one of the world\'s most prestigious universities.\n\nEstablished originally by the Massachusetts legislature and soon thereafter named for John Harvard (its first benefactor), Harvard is the United States\' oldest institution of higher learning, and the Harvard Corporation (formally, the President and Fellows of Harvard College) is its first chartered corporation.\n\nAlthough never formally affiliated with any denomination, the early College primarily trained Congregational and Unitarian clergy.\nIts curriculum and student body were gradually secularized during the 18th century, and by the 19th century Harvard had emerged as the central cultural establishment among Boston elites.',3,'Mon-Fri','2017-09-06 12:42:51','2017-10-11 16:36:14','http://static.urbancrawlapp.com/img/Boston/Harvard/Harvard-iStock-157332318.jpg',NULL);
INSERT INTO `place` (`id`, `cityid`, `name`, `description`, `numimages`, `timings`, `createdate`, `lastupdated`, `heroimage`, `herovideo`) VALUES (81,44,'North Bank Walkway','Boston Harborwalk is a public walkway that follows the edge of piers, wharves, beaches, and shoreline around Boston Harbor. When fully completed it will extend a distance of 47 miles (76 km) from East Boston to the Neponset River.\n\nThe Harborwalk is a cooperative project of the City of Boston, the Boston Planning and Development Agency, the Massachusetts Department of Environmental Protection, The Boston Harbor Association, and private property developers.\nSince 1984, the project has established parks, walking paths, educational sites, transportation facilities, and other amenities along the harbor. Many developers of private land along the harbor have been required under the provisions of the Boston Zoning Code and of Chapter 91 of Massachusetts state law to set back new buildings from the water and to provide publicly accessible waterfront pathways',3,'All Days','2017-09-06 12:42:51','2017-10-11 16:48:15','http://static.urbancrawlapp.com/img/Boston/NorthBankWalkway/North-Bank-Walkway-and-Zakim-Bridgei-Stock-175495514.jpg',NULL);
INSERT INTO `place` (`id`, `cityid`, `name`, `description`, `numimages`, `timings`, `createdate`, `lastupdated`, `heroimage`, `herovideo`) VALUES (91,54,'Al-Mamzar Beach','Al Mamzar is a locality in Dubai, United Arab Emirates (UAE). Al Mamzar is located in the area of Deira, in the north-east of Dubai. The locality is bordered by the Persian Gulf to the north, Al Waheda to the west, Hor Al Anz to the south and the emirate of Sharjah to the east.\n\nThe north-east section of the locality is residential. Al Ittihad School, Dubai Cultural and Scientific Association, Al Gaz Mosque, Dubai Police Headquarters and Al Mamzar Park are important landmarks in the locality.',3,'All Days','2017-11-19 10:06:12','2017-11-19 10:06:12','http://static.urbancrawlapp.com/img/Dubai/BurjAlArab/Burj-Al-Arab-(ICON)-iStock-182817377.jpg',NULL);
INSERT INTO `place` (`id`, `cityid`, `name`, `description`, `numimages`, `timings`, `createdate`, `lastupdated`, `heroimage`, `herovideo`) VALUES (101,54,'Burj Al-Arab','The Burj Al Arab (Tower of the Arabs) is a luxury hotel located in Dubai, United Arab Emirates. It is the third tallest hotel in the world (although 39% of its total height is made up of non-occupiable space). Burj Al Arab stands on an artificial island 280 m (920 ft) from Jumeirah beach and is connected to the mainland by a private curving bridge. The shape of the structure is designed to resemble the sail of a ship. It has a helipad near the roof at a height of 210 m (689 ft) above ground.',3,'All Days','2017-11-19 10:06:12','2017-11-19 10:06:12','http://static.urbancrawlapp.com/img/Dubai/BurjAlArab/Burj-Al-Arab-(ICON)-iStock-182817377.jpg',NULL);
INSERT INTO `place` (`id`, `cityid`, `name`, `description`, `numimages`, `timings`, `createdate`, `lastupdated`, `heroimage`, `herovideo`) VALUES (111,54,'Burj Khalifa','The Burj Khalifa (Khalifa Tower), known as the Burj Dubai before its inauguration, is a megatall skyscraper in Dubai, United Arab Emirates. With a total height of 829.8 m (2,722 ft) and a roof height (excluding antenna) of 828 m (2,717 ft), the Burj Khalifa is the tallest structure in the world since topping out in late 2008.\n\nConstruction of the Burj Khalifa began in 2004, with the exterior completed five years later in 2009. The primary structure is reinforced concrete. The building was opened in 2010 as part of a new development called Downtown Dubai. It is designed to be the centrepiece of large-scale, mixed-use development. The decision to construct the building is reportedly based on the government\'s decision to diversify from an oil-based economy, and for Dubai to gain international recognition. The building was originally named Burj Dubai but was renamed in honour of the ruler of Abu Dhabi and president of the United Arab Emirates, Khalifa bin Zayed Al Nahyan.',3,'All Days','2017-11-19 10:06:12','2017-11-19 10:06:12','http://static.urbancrawlapp.com/img/Dubai/BurjKhalifa/Burj-Khalifa-(ICON)-iStock-183371461.jpg',NULL);
INSERT INTO `place` (`id`, `cityid`, `name`, `description`, `numimages`, `timings`, `createdate`, `lastupdated`, `heroimage`, `herovideo`) VALUES (121,54,'Dubai Creek','Dubai Creek is a saltwater creek located in Dubai, United Arab Emirates (UAE). Previously it extended to Ras Al Khor Wildlife Sanctuary but as part of the new Dubai canal it extends through to the Persian Gulf. Some sources say that the creek extended as far inland as Al Ain, and that the Ancient Greeks called it River Zara.\n\nHistorically, the creek divided the city into two main sections – Deira and Bur Dubai. It was along the Bur Dubai creek area that members of the Bani Yas tribe first settled in the 19th century, establishing the Al Maktoum dynasty in the city. In the early 20th century, the creek, though incapable then of supporting large scale transportation, served as a minor port for dhows coming from as far away as India or East Africa. Although it impeded the entry of ships due to current flow, the creek remained an important element in establishing the commercial position of Dubai, being the only port or harbour in the city.',3,'All Days','2017-11-19 10:06:12','2017-11-19 10:06:12','http://static.urbancrawlapp.com/img/Dubai/DubaiCreek/Dubai-Creek-(ICON)-iStock-518207982.jpg',NULL);
INSERT INTO `place` (`id`, `cityid`, `name`, `description`, `numimages`, `timings`, `createdate`, `lastupdated`, `heroimage`, `herovideo`) VALUES (131,54,'Dubai Marina','Dubai Marina is a district in Dubai, United Arab Emirates. Dubai Marina is an artificial canal city, built along a two-mile (3 km) stretch of Persian Gulf shoreline. When the entire development is complete, it will accommodate more than 120,000 people in residential towers and villas. It is located on Interchange 5 between Jebel Ali Port and the area which hosts Dubai Internet City, Dubai Media City, and the American University in Dubai. The first phase of this project has been completed. Dubai Marina was inspired by the Concord Pacific Place development along False Creek in Vancouver, BC, Canada.\n\nThere have been many instances of marine wildlife (especially whales and sharks) entering the marina, because of its proximity to the open sea.',3,'All Days','2017-11-19 10:06:12','2017-11-19 10:06:12','http://static.urbancrawlapp.com/img/Dubai/DubaiMarina/Dubai-Marina-(ICON)-iStock-633690700.jpg',NULL);
INSERT INTO `place` (`id`, `cityid`, `name`, `description`, `numimages`, `timings`, `createdate`, `lastupdated`, `heroimage`, `herovideo`) VALUES (141,54,'Palm Jumeirah','The Palm Jumeirah is an artificial archipelago in United Arab Emirates, created using land reclamation by Nakheel called the Palm Islands (Palm Jumeirah, Palm Jebel Ali and Palm Deira) which would have extended into the Persian Gulf, increasing Dubai\'s shoreline by a total of 520 kilometres (320 mi). It is located on the Jumeirah coastal area of the emirate of Dubai, in the United Arab Emirates (UAE).',3,'All Days','2017-11-19 10:06:12','2017-11-19 10:06:12','http://static.urbancrawlapp.com/img/Dubai/PalmJumeirah/Palm-Jumeirah-(ICON)-iStock-502007826.jpg',NULL);
INSERT INTO `place` (`id`, `cityid`, `name`, `description`, `numimages`, `timings`, `createdate`, `lastupdated`, `heroimage`, `herovideo`) VALUES (151,64,'Big Ben','Big Ben is the nickname for the Great Bell of the clock at the north end of the Palace of Westminster in London[1] and is usually extended to refer to both the clock and the clock tower. The tower is officially Elizabeth Tower, renamed to celebrate the Diamond Jubilee of Elizabeth II in 2012; until then, it was known simply as the Clock Tower.\n\nThe tower was designed by Augustus Pugin in a neo-gothic style. When completed in 1859, it was, says horologist Ian Westworth, \"the prince of timekeepers: the biggest, most accurate four-faced striking and chiming clock in the world\". It stands 315 feet (96 m) tall, and the climb from ground level to the belfry is 334 steps. Its base is square, measuring 39 feet (12 m) on each side. Dials of the clock are 23 feet (7.0 m) in diameter. On 31 May 2009, celebrations were held to mark the tower\'s 150th anniversary.',3,'All Days','2017-11-19 10:06:12','2017-11-19 10:06:12','http://static.urbancrawlapp.com/img/London/BigBen/Big-Ben-(ICON)-iStock-155392163.jpg',NULL);
INSERT INTO `place` (`id`, `cityid`, `name`, `description`, `numimages`, `timings`, `createdate`, `lastupdated`, `heroimage`, `herovideo`) VALUES (161,64,'London Eye','The London Eye is a giant Ferris wheel on the South Bank of the River Thames in London.\n\nThe structure is 443 feet (135 m) tall and the wheel has a diameter of 394 feet (120 m). When it opened to the public in 2000 it was the world\'s tallest Ferris wheel. Its height was surpassed by the 525-foot (160 m) Star of Nanchang in 2006, the 541-foot (165 m) Singapore Flyer in 2008, and the 550-foot (167.6 m) High Roller (Las Vegas) in 2014. Supported by an A-frame on one side only, unlike the taller Nanchang and Singapore wheels, the Eye is described by its operators as \"the world\'s tallest cantilevered observation wheel\".',3,'All Days','2017-11-19 10:06:12','2017-11-19 10:06:12','http://static.urbancrawlapp.com/img/London/LondonEye/London-Eye-(ICON)-iStock-696006726.jpg',NULL);
INSERT INTO `place` (`id`, `cityid`, `name`, `description`, `numimages`, `timings`, `createdate`, `lastupdated`, `heroimage`, `herovideo`) VALUES (171,64,'St. James Park','St James\'s Park is a 23-hectare (57-acre) park in the City of Westminster, central London. The park lies at the southernmost tip of the St James\'s area, which was named after a leper hospital dedicated to St James the Less. The park is the most easterly of a near-continuous chain of parks that comprises (moving westward) Green Park, Hyde Park, and Kensington Gardens.\n\nThe park is bounded by Buckingham Palace to the west, the Mall to the north, Horse Guards to the east, and Birdcage Walk to the south. It meets Green Park at Queen\'s Gardens with the Victoria Memorial at its centre, opposite the entrance to Buckingham Palace. St James\'s Palace is on the opposite side of The Mall.',3,'All Days','2017-11-19 10:06:12','2017-11-19 10:06:12','http://static.urbancrawlapp.com/img/London/StJamesPark/St-James\'s-Park-(ICON)-iStock-527219774.jpg',NULL);
INSERT INTO `place` (`id`, `cityid`, `name`, `description`, `numimages`, `timings`, `createdate`, `lastupdated`, `heroimage`, `herovideo`) VALUES (181,64,'The Shard','The Shard, also referred to as the Shard of Glass, Shard London Bridge and formerly London Bridge Tower, is a 95-storey skyscraper in Southwark, London, that forms part of the London Bridge Quarter development. Standing 309.7 metres (1,016 ft) high, the Shard is the tallest building in the United Kingdom, the tallest building in the European Union, the fourth-tallest building in Europe and the 96th-tallest building in the world. It is also the second-tallest free-standing structure in the United Kingdom, after the concrete tower of the Emley Moor transmitting station.',3,'All Days','2017-11-19 10:06:12','2017-11-19 10:06:12','http://static.urbancrawlapp.com/img/London/TheShard/The-Shard-(ICON)-iStock-482667566.jpg',NULL);
INSERT INTO `place` (`id`, `cityid`, `name`, `description`, `numimages`, `timings`, `createdate`, `lastupdated`, `heroimage`, `herovideo`) VALUES (191,64,'Tower Bridge','Tower Bridge is a combined bascule and suspension bridge in London built between 1886 and 1894. The bridge crosses the River Thames close to the Tower of London and has become an iconic symbol of London, resulting in it sometimes being confused with London Bridge, situated some 0.5 mi (0.80 km) upstream. Tower Bridge is one of five London bridges now owned and maintained by the Bridge House Estates, a charitable trust overseen by the City of London Corporation. It is the only one of the Trust\'s bridges not to connect the City of London directly to the Southwark bank, as its northern landfall is in Tower Hamlets.',3,'All Days','2017-11-19 10:06:12','2017-11-19 10:06:12','http://static.urbancrawlapp.com/img/London/TowerBridge/Tower-Bridge-(ICON)-iStock-450435855.jpg',NULL);
INSERT INTO `place` (`id`, `cityid`, `name`, `description`, `numimages`, `timings`, `createdate`, `lastupdated`, `heroimage`, `herovideo`) VALUES (201,64,'Trafalgar Square','Trafalgar Square is a public square in the City of Westminster, Central London, built around the area formerly known as Charing Cross. Its name commemorates the Battle of Trafalgar, a British naval victory in the Napoleonic Wars with France and Spain that took place on 21 October 1805 off the coast of Cape Trafalgar, Spain.\n\nThe site of Trafalgar Square had been a significant landmark since the 13th century and originally contained the King\'s Mews. After George IV moved the mews to Buckingham Palace, the area was redeveloped by John Nash, but progress was slow after his death, and the square did not open until 1844. The 169-foot (52 m) Nelson\'s Column at its centre is guarded by four lion statues. A number of commemorative statues and sculptures occupy the square, but the Fourth Plinth, left empty since 1840, has been host to contemporary art since 1999.',3,'All Days','2017-11-19 10:06:12','2017-11-19 10:06:12','http://static.urbancrawlapp.com/img/London/TrafalgarSquare/Trafalgar-Square-(ICON)-iStock-525609635.jpg',NULL);
INSERT INTO `place` (`id`, `cityid`, `name`, `description`, `numimages`, `timings`, `createdate`, `lastupdated`, `heroimage`, `herovideo`) VALUES (211,74,'Arc De Triomphe','The Arc de Triomphe de l\'Étoile is one of the most famous monuments in Paris, standing at the western end of the Champs-Élysées at the center of Place Charles de Gaulle, formerly named Place de l\'Étoile — the étoile or \"star\" of the juncture formed by its twelve radiating avenues.\n\nThe Arc de Triomphe should not be confused with a smaller arch, the Arc de Triomphe du Carrousel, which stands west of the Louvre. The Arc de Triomphe honours those who fought and died for France in the French Revolutionary and Napoleonic Wars, with the names of all French victories and generals inscribed on its inner and outer surfaces. Beneath its vault lies the Tomb of the Unknown Soldier from World War I.',3,'All Days','2017-11-19 10:06:12','2017-11-19 10:06:12','http://static.urbancrawlapp.com/img/Paris/ArcDeTriomphe/Arc-de-Triomphe-(ICON)-iStock-576563448.jpg',NULL);
INSERT INTO `place` (`id`, `cityid`, `name`, `description`, `numimages`, `timings`, `createdate`, `lastupdated`, `heroimage`, `herovideo`) VALUES (221,74,'Eiffel Tower','The Eiffel Tower is a wrought iron lattice tower on the Champ de Mars in Paris, France. It is named after the engineer Gustave Eiffel, whose company designed and built the tower.\n\nConstructed from 1887–89 as the entrance to the 1889 World\'s Fair, it was initially criticized by some of France\'s leading artists and intellectuals for its design, but it has become a global cultural icon of France and one of the most recognisable structures in the world. The Eiffel Tower is the most-visited paid monument in the world; 6.91 million people ascended it in 2015.',3,'All Days','2017-11-19 10:06:12','2017-11-19 10:06:12','http://static.urbancrawlapp.com/img/Paris/EiffelTower/Eiffel-Tower-(ICON)-iStock-183036930.jpg',NULL);
INSERT INTO `place` (`id`, `cityid`, `name`, `description`, `numimages`, `timings`, `createdate`, `lastupdated`, `heroimage`, `herovideo`) VALUES (231,74,'Jardin des Tuileries','The Tuileries Garden is a public garden located between the Louvre Museum and the Place de la Concorde in the 1st arrondissement of Paris. Created by Catherine de\' Medici as the garden of the Tuileries Palace in 1564, it was eventually opened to the public in 1667 and became a public park after the French Revolution. In the 19th and 20th centuries, it was a place where Parisians celebrated, met, strolled, and relaxed.\n\nIn July 1559, after the death of her husband, Henry II, Queen Catherine de\' Medici decided to move from her residence at the chateau of Tournelles, near the Bastille, to the Louvre Palace, along with her son, the new King, François II. She decided that she would build a new palace there for herself, separate from the Louvre, with a garden modeled after the gardens of her native Florence.',3,'All Days','2017-11-19 10:06:12','2017-11-19 10:06:12','http://static.urbancrawlapp.com/img/Paris/JardinDesTuileries/Jardin-des-Tuileries-(ICON)-iStock-503482658.jpg',NULL);
INSERT INTO `place` (`id`, `cityid`, `name`, `description`, `numimages`, `timings`, `createdate`, `lastupdated`, `heroimage`, `herovideo`) VALUES (241,74,'Luxembourg Palace','The Luxembourg Palace is located at 15 rue de Vaugirard in the 6th arrondissement of Paris. It was originally built (1615–1645) to the designs of the French architect Salomon de Brosse to be the royal residence of the regent Marie de\' Medici, mother of Louis XIII of France. After the Revolution it was refashioned (1799–1805) by Jean Chalgrin into a legislative building and subsequently greatly enlarged and remodeled (1835–1856) by Alphonse de Gisors. Since 1958 it has been the seat of the French Senate of the Fifth Republic.\n\nImmediately west of the palace on the rue de Vaugirard is the Petit Luxembourg, now the residence of the Senate President; and slightly further west, the Musée du Luxembourg, in the former orangery. On the south side of the palace, the formal Luxembourg Garden presents a 25-hectare green parterre of gravel and lawn populated with statues and large basins of water where children sail model boats.',3,'All Days','2017-11-19 10:06:12','2017-11-19 10:06:12','http://static.urbancrawlapp.com/img/Paris/LuxembourgPalace/Luxembourg-Palace-(ICON)-iStock-151514883.jpg',NULL);
INSERT INTO `place` (`id`, `cityid`, `name`, `description`, `numimages`, `timings`, `createdate`, `lastupdated`, `heroimage`, `herovideo`) VALUES (251,74,'Montmartre','Montmartre is a large hill in Paris\'s 18th arrondissement. It is 130 m (430 ft) high and gives its name to the surrounding district, part of the Right Bank in the northern section of the city. The historic district established by the City of Paris in 1995 is bordered by rue Caulaincourt and rue Custine on the north, rue de Clignancourt on the east, and boulevard de Clichy and boulevard de Rochechouart to the south, containing 60 ha (150 acres). Montmartre is primarily known for its artistic history, the white-domed Basilica of the Sacré-Cœur on its summit, and as a nightclub district. The other, older, church on the hill is Saint Pierre de Montmartre, which claims to be the location at which the Jesuit order of priests was founded.',3,'All Days','2017-11-19 10:06:12','2017-11-19 10:06:12','http://static.urbancrawlapp.com/img/Paris/Montmartre/Montmartre-(ICON)-iStock-538614723.jpg',NULL);
INSERT INTO `place` (`id`, `cityid`, `name`, `description`, `numimages`, `timings`, `createdate`, `lastupdated`, `heroimage`, `herovideo`) VALUES (261,74,'Musée d’Orsay','The Musée d\'Orsay is a museum in Paris, France, on the Left Bank of the Seine. It is housed in the former Gare d\'Orsay, a Beaux-Arts railway station built between 1898 and 1900. The museum holds mainly French art dating from 1848 to 1914, including paintings, sculptures, furniture, and photography. It houses the largest collection of impressionist and post-Impressionist masterpieces in the world, by painters including Monet, Manet, Degas, Renoir, Cézanne, Seurat, Sisley, Gauguin, and Van Gogh. Many of these works were held at the Galerie nationale du Jeu de Paume prior to the museum\'s opening in 1986. It is one of the largest art museums in Europe.\n\nThe museum building was originally a railway station, Gare d\'Orsay, constructed for the Chemin de Fer de Paris à Orléans and finished in time for the 1900 Exposition Universelle to the design of three architects: Lucien Magne, Émile Bénard and Victor Laloux. It was the terminus for the railways of southwestern France until 1939.',3,'All Days','2017-11-19 10:06:12','2017-11-19 10:06:12','http://static.urbancrawlapp.com/img/Paris/MuseeDOrsay/Musée-d’Orsay-(ICON)-iStock-600066932.jpg',NULL);
INSERT INTO `place` (`id`, `cityid`, `name`, `description`, `numimages`, `timings`, `createdate`, `lastupdated`, `heroimage`, `herovideo`) VALUES (271,84,'Carioca Aqueduct','The Carioca Aqueduct is an aqueduct in the city of Rio de Janeiro, Brazil. The aqueduct was built in the middle of the 18th century to bring fresh water from the Carioca river to the population of the city. It is an impressive example of colonial architecture and engineering.\n\nThe Carioca Aqueduct is located in the centre of the city, in the Lapa neighbourhood, and is frequently called Arcos da Lapa (Lapa Arches) by Brazilian people. Since the end of the 19th century the aqueduct serves as a bridge for a popular tram that connects the city centre with the Santa Teresa neighbourhood uphill, the Santa Teresa Tramway.',3,'All Days','2017-11-19 10:06:12','2017-11-19 10:06:12','http://static.urbancrawlapp.com/img/RioDeJaneiro/CariocaAqueduct/Carioca-Aqueduct-(ICON)-iStock-842952796.jpg',NULL);
INSERT INTO `place` (`id`, `cityid`, `name`, `description`, `numimages`, `timings`, `createdate`, `lastupdated`, `heroimage`, `herovideo`) VALUES (281,84,'Copacabana Beach','Copacabana beach, located at the Atlantic shore, stretches from Posto Dois (lifeguard watchtower Two) to Posto Seis (lifeguard watchtower Six). Leme is at Posto Um (lifeguard watchtower One). There are historic forts at both ends of Copacabana beach; Fort Copacabana, built in 1914, is at the south end by Posto Seis and Fort Duque de Caxias, built in 1779, at the north end. One curiosity is that the lifeguard watchtower of Posto Seis never existed. Hotels, restaurants, bars, nightclubs and residential buildings dot the promenade facing Avenida Atlântica.\n\nCopacabana Beach plays host to millions of revellers during the annual New Year\'s Eve celebrations, and in most years, has been the official venue of the FIFA Beach Soccer World Cup.',3,'All Days','2017-11-19 10:06:12','2017-11-19 10:06:12','http://static.urbancrawlapp.com/img/RioDeJaneiro/CopacabanaBeach/Copacabana-Beach-(ICON)-iStock-545356656.jpg',NULL);
INSERT INTO `place` (`id`, `cityid`, `name`, `description`, `numimages`, `timings`, `createdate`, `lastupdated`, `heroimage`, `herovideo`) VALUES (291,84,'Ipanema Beach','The beach at Ipanema is known for its elegant development and its social life. Two mountains called the Dois Irmãos (Two Brothers) rise at the western end of the beach, which is divided into segments delineated by postos, or lifeguard towers. Beer is sold everywhere, along with the traditional cachaça. There are always circles of people playing football, volleyball, and footvolley, a locally invented sport that is a combination of volleyball and football.\n\nIn the winter the surf can reach nine feet. The water quality varies from clear light-blue water to a more murky green after heavy rains. Constant swells help keep the water clean, and the often treacherous beach break regularly forms surfable barrels. Just west of this colorful section, towards Leblon, Rio de Janeiro, is another popular stretch of sand known as Posto 10, referring to the #10 lifeguard station.',3,'All Days','2017-11-19 10:06:12','2017-11-19 10:06:12','http://static.urbancrawlapp.com/img/RioDeJaneiro/IpanemaBeach/Ipanema-Beach-(ICON)-iStock-157436364.jpg',NULL);
INSERT INTO `place` (`id`, `cityid`, `name`, `description`, `numimages`, `timings`, `createdate`, `lastupdated`, `heroimage`, `herovideo`) VALUES (301,84,'Pedra da Gávea','Pedra da Gávea is a monolithic mountain in Tijuca Forest, Rio de Janeiro, Brazil. Composed of granite and gneiss, its elevation is 844 metres (2,769 ft), making it one of the highest mountains in the world that ends directly in the ocean. Trails on the mountain were opened up by the local farming population in the early 1800s; today, the site is under the administration of the Tijuca National Park.\n\nThe mountain\'s name translates as Rock of the Topsail, and was given to it during the expedition of Captain Gaspar de Lemos, begun in 1501, and in which the Rio de Janeiro bay (today Guanabara Bay, but after which the city was named) also received its name. The mountain, one of the first in Brazil to be named in Portuguese, was named by the expedition\'s sailors, who compared its silhouette to that of the shape of a topsail of a carrack upon sighting it on January 1, 1502. That name in turn came to be given to the Gávea area of the city of Rio de Janeiro.',3,'All Days','2017-11-19 10:06:12','2017-11-19 10:06:12','http://static.urbancrawlapp.com/img/RioDeJaneiro/PedraDaGavea/Pedra-da-Gávea-(ICON)-iStock-455049627.jpg',NULL);
INSERT INTO `place` (`id`, `cityid`, `name`, `description`, `numimages`, `timings`, `createdate`, `lastupdated`, `heroimage`, `herovideo`) VALUES (311,84,'Sugarloaf Mountain','Sugarloaf Mountain is a peak situated in Rio de Janeiro, Brazil, at the mouth of Guanabara Bay on a peninsula that juts out into the Atlantic Ocean. Rising 396 m (1,299 ft) above the harbor, its name is said to refer to its resemblance to the traditional shape of concentrated refined loaf sugar. It is known worldwide for its cableway and panoramic views of the city.\n\nThe mountain is one of several monolithic granite and quartz mountains that rise straight from the water\'s edge around Rio de Janeiro.\n\nThe mountain is protected by the Sugarloaf Mountain and Urca Hill Natural Monument, created in 2006. This became part of a World Heritage Site declared by UNESCO in 2012.',3,'All Days','2017-11-19 10:06:12','2017-11-19 10:06:12','http://static.urbancrawlapp.com/img/RioDeJaneiro/SugarloafMountain/Sugarloaf-Mountain-(ICON)-iStock-157332168.jpg',NULL);
INSERT INTO `place` (`id`, `cityid`, `name`, `description`, `numimages`, `timings`, `createdate`, `lastupdated`, `heroimage`, `herovideo`) VALUES (321,84,'Tijuca Forest','The Tijuca Forest (Portuguese: Floresta da Tijuca) is a tropical rainforest in the city of Rio de Janeiro, Brazil. It is claimed to be the world\'s largest urban forest, covering some 32 km² (12.4 mi²), although there are sources assigning this title to the urban forest of Johannesburg, South Africa, where between 6 and 9.5 million trees were planted. Similar to Rio de Janeiro\'s Tijuca Forest, the UNESCO World Heritage Site Singapore Botanic Gardens (established in 1859) is another renowned garden with a tropical rainforest within its city limits.',3,'All Days','2017-11-19 10:06:12','2017-11-19 10:06:12','http://static.urbancrawlapp.com/img/RioDeJaneiro/TijucaForest/Tijuca-Forest-(ICON)-iStock-452700009.jpg',NULL);
INSERT INTO `place` (`id`, `cityid`, `name`, `description`, `numimages`, `timings`, `createdate`, `lastupdated`, `heroimage`, `herovideo`) VALUES (331,94,'Chinatown','The Chinatown centered on Grant Avenue and Stockton Street in San Francisco, California, is the oldest Chinatown in North America and the largest Chinese enclave outside Asia. It is the oldest of the four notable Chinatowns in the city. Since its establishment in 1848, it has been highly important and influential in the history and culture of ethnic Chinese immigrants in North America. Chinatown is an enclave that continues to retain its own customs, languages, places of worship, social clubs, and identity. There are two hospitals, numerous parks and squares, a post office, and other infrastructure. While recent immigrants and the elderly choose to live here because of the availability of affordable housing and their familiarity with the culture, the place is also a major tourist attraction, drawing more visitors annually than the Golden Gate Bridge.\n',3,'All Days','2017-11-19 10:06:12','2017-11-19 10:06:12','http://static.urbancrawlapp.com/img/SanFrancisco/Chinatown/Chinatown-(ICON)-iStock-182854265.jpg',NULL);
INSERT INTO `place` (`id`, `cityid`, `name`, `description`, `numimages`, `timings`, `createdate`, `lastupdated`, `heroimage`, `herovideo`) VALUES (341,94,'Coit Tower','Coit Tower, also known as the Lillian Coit Memorial Tower, is a 210-foot (64 m) tower in the Telegraph Hill neighborhood of San Francisco, California. The tower, in the city\'s Pioneer Park, was built in 1933 using Lillie Hitchcock Coit\'s bequest to beautify the city of San Francisco; at her death in 1929 Coit left one-third of her estate to the city for civic beautification. The tower was proposed in 1931 as an appropriate use of Coit\'s gift. It was added to the National Register of Historic Places on January 29, 2008.\n\nThe art deco tower, built of unpainted reinforced concrete, was designed by architects Arthur Brown, Jr. and Henry Howard, with fresco murals by 27 different on-site artists and their numerous assistants, plus two additional paintings installed after creation off-site. Although an apocryphal story claims that the tower was designed to resemble a fire hose nozzle due to Coit\'s affinity with the San Francisco firefighters of the day, the resemblance is coincidental.',3,'All Days','2017-11-19 10:06:12','2017-11-19 10:06:12','http://static.urbancrawlapp.com/img/SanFrancisco/CoitTower/Coit-Tower-(ICON)-iStock-484770882.jpg',NULL);
INSERT INTO `place` (`id`, `cityid`, `name`, `description`, `numimages`, `timings`, `createdate`, `lastupdated`, `heroimage`, `herovideo`) VALUES (351,94,'Ferry Building','The San Francisco Ferry Building is a terminal for ferries that travel across the San Francisco Bay, a food hall and an office building. It is located on The Embarcadero in San Francisco, California.\n\nOn top of the building is a 245-foot-tall (75 m) clock tower with four clock dials, each 22 feet (6.7 m) in diameter, which can be seen from Market Street, a main thoroughfare of the city.\n\nDesigned in 1892 by American architect A. Page Brown in the Beaux Arts style, the ferry building was completed in 1898. At its opening, it was the largest project undertaken in the city up to that time. Brown designed the clock tower after the 12th-century Giralda bell tower in Seville, Spain, and the entire length of the building on both frontages is based on an arched arcade.',3,'All Days','2017-11-19 10:06:12','2017-11-19 10:06:12','http://static.urbancrawlapp.com/img/SanFrancisco/FerryBuilding/Ferry-Building-(ICON)-iStock-175205593.jpg',NULL);
INSERT INTO `place` (`id`, `cityid`, `name`, `description`, `numimages`, `timings`, `createdate`, `lastupdated`, `heroimage`, `herovideo`) VALUES (361,94,'Golden Gate Bridge','The Golden Gate Bridge is a suspension bridge spanning the Golden Gate, the one-mile-wide (1.6 km) strait connecting San Francisco Bay and the Pacific Ocean. The structure links the American city of San Francisco, California – the northern tip of the San Francisco Peninsula – to Marin County, carrying both U.S. Route 101 and California State Route 1 across the strait. The bridge is one of the most internationally recognized symbols of San Francisco, California, and the United States. It has been declared one of the Wonders of the Modern World by the American Society of Civil Engineers.\n\nThe Frommer\'s travel guide describes the Golden Gate Bridge as \"possibly the most beautiful, certainly the most photographed, bridge in the world.\" It opened in 1937 and was, until 1964, the longest suspension bridge main span in the world, at 4,200 feet (1,280 m).',3,'All Days','2017-11-19 10:06:12','2017-11-19 10:06:12','http://static.urbancrawlapp.com/img/SanFrancisco/GoldenGateBridge/Golden-Gate-Bridge-(ICON)-iStock-177770941.jpg',NULL);
INSERT INTO `place` (`id`, `cityid`, `name`, `description`, `numimages`, `timings`, `createdate`, `lastupdated`, `heroimage`, `herovideo`) VALUES (371,94,'Lombard Street','Lombard Street is an east–west street in San Francisco, California that is famous for a steep, one-block section with eight hairpin turns. Stretching from The Presidio east to The Embarcadero (with a gap on Telegraph Hill), most of the street\'s western segment is a major thoroughfare designated as part of U.S. Route 101. The famous one-block section, claimed as \"the crookedest street in the world\", is located along the eastern segment in the Russian Hill neighborhood. The street was named after Lombard Street in Philadelphia by San Francisco surveyor Jasper O\'Farrell.',3,'All Days','2017-11-19 10:06:12','2017-11-19 10:06:12','http://static.urbancrawlapp.com/img/SanFrancisco/LombardStreet/Lombard-Street-(ICON)-iStock-186826837.jpg',NULL);
INSERT INTO `place` (`id`, `cityid`, `name`, `description`, `numimages`, `timings`, `createdate`, `lastupdated`, `heroimage`, `herovideo`) VALUES (381,94,'Palace Of Fine Arts','The Palace of Fine Arts in the Marina District of San Francisco, California, is a monumental structure originally constructed for the 1915 Panama-Pacific Exposition in order to exhibit works of art presented there. One of only a few surviving structures from the Exposition, it is still situated on its original site. It was rebuilt in 1965, and renovation of the lagoon, walkways, and a seismic retrofit were completed in early 2009.\n\nIn addition to hosting art exhibitions, it remains a popular attraction for tourists and locals and is a favorite location for weddings and wedding party photographs for couples throughout the San Francisco Bay Area and such an icon that a miniature replica of it was built in Disney\'s California Adventure in Anaheim.',3,'All Days','2017-11-19 10:06:12','2017-11-19 10:06:12','http://static.urbancrawlapp.com/img/SanFrancisco/PalaceOfFineArts/Palace-of-Fine-Arts-(ICON)-iStock-161842200.jpg',NULL);
INSERT INTO `place` (`id`, `cityid`, `name`, `description`, `numimages`, `timings`, `createdate`, `lastupdated`, `heroimage`, `herovideo`) VALUES (391,104,'Clarke Quay','Clarke Quay was named after Sir Andrew Clarke, Singapore\'s second Governor and Governor of the Straits Settlements from 1873 to 1875, who played a key role in positioning Singapore as the main port for the Malay states of Perak, Selangor and Sungei Ujong.\n\nClarke Quay is also the name of a road along the quay, part of which has since been converted into a pedestrian mall. Clarke Street, located next to Clarke Quay, was officially named in 1896, and was originally two streets known simply as East Street and West Street in north Kampong Malacca. Similar to Clarke Quay, Clarke Street has since been converted into a pedestrian mall.',3,'All Days','2017-11-19 10:06:12','2017-11-19 10:06:12','http://static.urbancrawlapp.com/img/Singapore/ClarkeQuay/Clarke-Quay-(ICON)-iStock-496601845.jpg',NULL);
INSERT INTO `place` (`id`, `cityid`, `name`, `description`, `numimages`, `timings`, `createdate`, `lastupdated`, `heroimage`, `herovideo`) VALUES (401,104,'Fort Canning','Fort Canning (Malay: Bukit Larangan) is a small hill slightly more than 60 metres high in the southeast portion of the island city-state of Singapore, within the Central Area that forms Singapore\'s central business district. Although small in physical size, it has a long history intertwined with that of the city-state due to its location as the highest elevation within walking distance to the city\'s civic district within the Downtown Core. It is also a popular venue for music shows and concerts.\n\nThe Malays called the hill Bukit Larangan or Forbidden Hill since olden times. This is due to the belief that it is the place where the kings of ancient Singapore were laid to rest, and it was believed to be haunted. It was also believed that a palace once stood on the hill. A settlement on the hill in the 14th century was named Ban Zu (from the Malay pancur) by the Yuan dynasty traveller Wang Dayuan. Later Sir Stamford Raffles built his residence there, which was also used by other Residents.',3,'All Days','2017-11-19 10:06:12','2017-11-19 10:06:12','http://static.urbancrawlapp.com/img/Singapore/FortCanning/Fort-Canning-(ICON)-iStock-592022408.jpg',NULL);
INSERT INTO `place` (`id`, `cityid`, `name`, `description`, `numimages`, `timings`, `createdate`, `lastupdated`, `heroimage`, `herovideo`) VALUES (411,104,'Garden By The Bay','Gardens by the Bay is a nature park spanning 101 hectares (250 acres) of reclaimed land in central Singapore, adjacent to the Marina Reservoir. The park consists of three waterfront gardens: Bay South Garden, Bay East Garden and Bay Central Garden. The largest of the gardens is Bay South Garden at 54 hectares (130 acres).\n\nGardens by the Bay is part of a strategy by the Singapore government to transform Singapore from a \"Garden City\" to a \"City in a Garden\". The stated aim is to raise the quality of life by enhancing greenery and flora in the city.',3,'All Days','2017-11-19 10:06:12','2017-11-19 10:06:12','http://static.urbancrawlapp.com/img/Singapore/GardenByTheBay/Garden-by-the-Bay-(ICON)-iStock-690448050.jpg',NULL);
INSERT INTO `place` (`id`, `cityid`, `name`, `description`, `numimages`, `timings`, `createdate`, `lastupdated`, `heroimage`, `herovideo`) VALUES (421,104,'Helix Bridge','The Helix Bridge, officially The Helix, and previously known as the Double Helix Bridge, is a pedestrian bridge linking Marina Centre with Marina South in the Marina Bay area in Singapore. It was officially opened on 24 April 2010 at 9 pm; however, only half was opened due to ongoing construction at the Marina Bay Sands. It is located beside the Benjamin Sheares Bridge and is accompanied by a vehicular bridge, known as the Bayfront Bridge. The entire bridge was opened on 18 July 2010 to complete the entire walkway around Marina Bay.\n\nThe design consortium is an international team comprising Australian architects the Cox Architecture and engineers Arup, and Singapore based Architects 61.',3,'All Days','2017-11-19 10:06:12','2017-11-19 10:06:12','http://static.urbancrawlapp.com/img/Singapore/Helix-Bridge/Helix-Bridge-(ICON)-iStock-132059664.jpg',NULL);
INSERT INTO `place` (`id`, `cityid`, `name`, `description`, `numimages`, `timings`, `createdate`, `lastupdated`, `heroimage`, `herovideo`) VALUES (431,104,'Sentosa','Sentosa is a popular island resort in Singapore, visited by some twenty million people a year. Attractions include a 2 km (1.2 mi) long sheltered beach, Fort Siloso, two golf courses, the Merlion, 14 hotels, and the Resorts World Sentosa, featuring the theme park Universal Studios Singapore.\n\nThe name Sentosa translates as \"peace and tranquility\" in Malay, which was in turn derived from the Sanskrit term Santosha (संतोष, IAST: Saṃtoṣa), meaning \"contentment, satisfaction\". Sentosa was formerly known as Pulau Blakang Mati which in Malay means the \"Island of Death from Behind\".',3,'All Days','2017-11-19 10:06:12','2017-11-19 10:06:12','http://static.urbancrawlapp.com/img/Singapore/Sentosa/Sentosa-(ICON)-iStock-639005972.jpg',NULL);
INSERT INTO `place` (`id`, `cityid`, `name`, `description`, `numimages`, `timings`, `createdate`, `lastupdated`, `heroimage`, `herovideo`) VALUES (441,104,'Singapore Flyer','The Singapore Flyer is a giant Ferris wheel in Singapore. Described by its operators as an observation wheel, it opened in 2008, construction having taken about 2½ years. It carried its first paying passengers on 11 February, opened to the public on 1 March, and was officially opened on 15 April. It has 28 air-conditioned capsules, each able to accommodate 28 passengers, and incorporates a three-storey terminal building.\n\nThe Flyer has an overall height of 165 metres (541 ft) and was the world\'s tallest Ferris wheel until the 167.6 m (550 ft) High Roller, which is 2.6 m (9 ft) taller than the Flyer,[7] opened on the Las Vegas Strip in Nevada, US, on 31 March 2014. The previous record holder, the Star of Nanchang, in Jiangxi, China, is 160 m (525 ft) tall, although its 153 m (502 ft) diameter wheel is larger than the Flyer\'s 150 m (492 ft) wheel.',3,'All Days','2017-11-19 10:06:12','2017-11-19 10:06:12','http://static.urbancrawlapp.com/img/Singapore/SingaporeFlyer/Singapore-Flyer-(ICON)-iStock-525559543.jpg',NULL);
/*!40000 ALTER TABLE `place` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `token`
--

DROP TABLE IF EXISTS `token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `token` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `token` text NOT NULL,
  `ttl` int(11) DEFAULT 604800 COMMENT 'time to live in seconds (1 week by default)',
  `createdate` date DEFAULT NULL,
  `userid` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=191 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `token`
--

LOCK TABLES `token` WRITE;
/*!40000 ALTER TABLE `token` DISABLE KEYS */;
/*!40000 ALTER TABLE `token` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-06-11 15:54:44
