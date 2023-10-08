"use client";
import { useState } from 'react';
import { BsImageFill } from "react-icons/bs";
import Popover from '@mui/material/Popover';

export default function Animal({ name = "Not name registered", endangered_state = "Unknown State", consult_year = "?", cite_source = "Not cite registered", img = '/next.svg' }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <section className="animal ">
        <div className="name">
          <div className='icon-container'>

            <BsImageFill className='icon' onMouseOut={handleClick} onMouseOver={handleClick}/>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              
            >
              
              <img src={`/images/${name}.jpg`} />
            </Popover>
          </div>
          <h4>{name}</h4>
        </div>
        <div id="endangered_state">
          <div className="state">
            <p>{endangered_state}</p>
          </div>
          <div className="year">
            <p><i>Last consulted on </i><strong>{consult_year}</strong></p>
          </div>
        </div>
        <div className="references">
          <p>{cite_source}</p>
        </div>
      </section>
    </>
  );
};
