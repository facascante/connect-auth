SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

DROP SCHEMA IF EXISTS `connect_auth` ;
CREATE SCHEMA IF NOT EXISTS `connect_auth` DEFAULT CHARACTER SET latin1 ;
USE `connect_auth` ;

-- -----------------------------------------------------
-- Table `connect_auth`.`users_profile`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `connect_auth`.`users_profile` ;

CREATE  TABLE IF NOT EXISTS `connect_auth`.`users_profile` (
  `id` BIGINT(20) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT ,
  `email` VARCHAR(50) NOT NULL ,
  `min` VARCHAR(12) NULL DEFAULT NULL ,
  `pin` VARCHAR(30) NULL DEFAULT NULL ,
  `salt` VARCHAR(100) NULL DEFAULT NULL ,
  `password` VARCHAR(100) NULL DEFAULT NULL ,
  `token` VARCHAR(100) NULL ,
  `nvs_credential` VARCHAR(100) NULL ,
  PRIMARY KEY (`id`, `email`) ,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) ,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) ,
  UNIQUE INDEX `min_UNIQUE` (`min` ASC) ,
  UNIQUE INDEX `pin_UNIQUE` (`pin` ASC) ,
  UNIQUE INDEX `salt_UNIQUE` (`salt` ASC) ,
  UNIQUE INDEX `password_UNIQUE` (`password` ASC) ,
  UNIQUE INDEX `token_UNIQUE` (`token` ASC) )
ENGINE = MyISAM
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `connect_auth`.`min_register`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `connect_auth`.`min_register` ;

CREATE  TABLE IF NOT EXISTS `connect_auth`.`min_register` (
  `id` BIGINT(20) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT ,
  `min` VARCHAR(12) NOT NULL ,
  `status` VARCHAR(45) NULL DEFAULT NULL ,
  `creation_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP ,
  PRIMARY KEY (`id`, `min`) ,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) ,
  UNIQUE INDEX `min_UNIQUE` (`min` ASC) )
ENGINE = MyISAM
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `connect_auth`.`pin_register`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `connect_auth`.`pin_register` ;

CREATE  TABLE IF NOT EXISTS `connect_auth`.`pin_register` (
  `id` BIGINT ZEROFILL NOT NULL AUTO_INCREMENT ,
  `pin` VARCHAR(30) NOT NULL ,
  `pid` BIGINT ZEROFILL NOT NULL ,
  `status` VARCHAR(45) NULL ,
  PRIMARY KEY (`id`, `pin`, `pid`) ,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) ,
  UNIQUE INDEX `pin_UNIQUE` (`pin` ASC) ,
  UNIQUE INDEX `pid_UNIQUE` (`pid` ASC) ,
  CONSTRAINT `fk_pin_register_users_profile1`
    FOREIGN KEY (`pin` )
    REFERENCES `connect_auth`.`users_profile` (`pin` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `connect_auth`.`package_info`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `connect_auth`.`package_info` ;

CREATE  TABLE IF NOT EXISTS `connect_auth`.`package_info` (
  `pid` BIGINT ZEROFILL NOT NULL AUTO_INCREMENT ,
  `pcode` VARCHAR(45) NOT NULL ,
  `pdesc` VARCHAR(200) NULL ,
  PRIMARY KEY (`pid`, `pcode`) ,
  UNIQUE INDEX `pid_UNIQUE` (`pid` ASC) ,
  UNIQUE INDEX `pcode_UNIQUE` (`pcode` ASC) ,
  CONSTRAINT `fk_package_info_pin_register`
    FOREIGN KEY (`pid` )
    REFERENCES `connect_auth`.`pin_register` (`pid` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

USE `connect_auth` ;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
