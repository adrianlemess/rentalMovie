-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema rentalmovies
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema rentalmovies
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `rentalmovies` DEFAULT CHARACTER SET latin1 ;
USE `rentalmovies` ;

-- -----------------------------------------------------
-- Table `rentalmovies`.`movies`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `rentalmovies`.`movies` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `director` VARCHAR(255) NOT NULL,
  `quantity_available` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `rentalmovies`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `rentalmovies`.`users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email` (`email` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `rentalmovies`.`rent_movie`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `rentalmovies`.`rent_movie` (
  `users_id` INT(11) NOT NULL,
  `movies_id` INT(11) NOT NULL,
  `rent_at` DATETIME NULL DEFAULT NULL,
  `return_at` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`users_id`, `movies_id`),
  INDEX `fk_users_has_movies_users_idx` (`users_id` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `rentalmovies`.`users_token`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `rentalmovies`.`users_token` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `token` VARCHAR(255) NULL,
  `users_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`, `users_id`),
  UNIQUE INDEX `token_UNIQUE` (`token` ASC))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
