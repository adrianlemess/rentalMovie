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
  `quantity_total` INT(11) NULL DEFAULT NULL,
  `quantity_rent` INT(11) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
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
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `rentalmovies`.`rent_movie`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `rentalmovies`.`rent_movie` (
  `rent_at` DATETIME NOT NULL,
  `return_at` DATETIME NULL DEFAULT NULL,
  `movies_id` INT(11) NOT NULL,
  `users_id` INT(11) NOT NULL,
  INDEX `fk_rent_movie_users1_idx` (`users_id` ASC),
  CONSTRAINT `fk_rent_movie_movies`
    FOREIGN KEY (`movies_id`)
    REFERENCES `rentalmovies`.`movies` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_rent_movie_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `rentalmovies`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

-- -----------------------------------------------------
-- Table `rentalmovies`.`users_token`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `rentalmovies`.`users_token` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `token` VARCHAR(255) NULL DEFAULT NULL,
  `users_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`, `users_id`),
  UNIQUE INDEX `token_UNIQUE` (`token` ASC),
  INDEX `fk_users_token_users1_idx` (`users_id` ASC),
  CONSTRAINT `fk_users_token_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `rentalmovies`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
