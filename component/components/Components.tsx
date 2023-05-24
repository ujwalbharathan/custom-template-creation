import React, { Ref } from 'react';
import { BsCircleFill, BsFileTextFill, BsSquareFill } from 'react-icons/bs';
import { FaImage, FaTrash } from 'react-icons/fa';
import './Components.scss';

export const Components = ({ setDragType }: { setDragType: any }) => {
  return (
    <div className="h-100 bg-dark text-light text-center pt-4 d-flex flex-column justify-content-between align-items-center components-container">
      <div className="w-100 px-3 pt-3 d-flex justify-content-center flex-column align-items-center">
        <div
          className=""
          draggable="true"
          onDragStart={(e: any) => {
            setDragType('circle');
          }}
        >
          <BsCircleFill className="fs-3 fw-bold" />
        </div>
        <hr className="w-100" />
        <div
          className=""
          draggable="true"
          onDragStart={(e: any) => {
            setDragType('rect');
          }}
        >
          <BsSquareFill className="fs-3 fw-bold" />
        </div>
        <hr className="w-100" />
        <div
          className=""
          draggable="true"
          onDragStart={(e: any) => {
            setDragType('image');
          }}
        >
          <FaImage className="fs-3 fw-bold" />
        </div>
        <hr className="w-100" />

        <div
          className=""
          draggable="true"
          onDragStart={(e: any) => {
            setDragType('text');
          }}
        >
          <BsFileTextFill className="fs-3 fw-bold" />
        </div>
      </div>
      <div className="border w-100 border-start-0 py-2 components-trash-button">
        <FaTrash />
      </div>
    </div>
  );
};
