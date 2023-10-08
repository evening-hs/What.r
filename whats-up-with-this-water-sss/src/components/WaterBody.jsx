import React from 'react';
import { GiDeathSkull } from "react-icons/gi";
import { MdGppGood, MdWarning, MdDangerous } from "react-icons/md";
import { FaBiohazard, FaPoop, FaQuestion } from "react-icons/fa6";
import { PiNumberZeroBold } from "react-icons/pi";
import axios from 'axios';
import { useState, useEffect } from 'react';
import ScrollBox from './ScrollBox';

export default function WaterBody({ special_cares = "No special cares", type = "Unknown type", semaphore = 0, contaminants = "No contaminants", cf_compliant = 0, tox_compliant = 0 }) {


  return (
    <>
      <ScrollBox>
        <div className="water">
          <div id="info">
            <div id="special_cares">
              <p>Special cares: {special_cares}</p>
            </div>
            <div id="subtype">
              <p>Type {type}</p>
            </div>
            <div id="semaphore">
              <p>Semaphore</p>
              {semaphore == 0 ? <MdGppGood /> : semaphore === 1 ? <MdWarning /> : <MdDangerous />}
            </div>
          </div>
        </div>
      </ScrollBox>
      <ScrollBox>
        <div className="status">
          <div id="contaminants">
            {/* You can render the list of contaminants here */}
            <p>Contaminants: {contaminants}</p>
          </div>

          <div id="cf_compliant">
            <p>Fecal coliforms</p>
            {cf_compliant > 0 ? <FaPoop /> : cf_compliant == 0 ? <FaQuestion /> : <PiNumberZeroBold />}
          </div>
          <div id="tox_compliant">
            <p>Toxicity </p>
            {tox_compliant > 0 ? <FaBiohazard /> : tox_compliant == 0 ? <FaQuestion /> : <PiNumberZeroBold />}
          </div>
        </div>
      </ScrollBox>
    </>
  );
};

