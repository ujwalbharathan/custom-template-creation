import React, { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Circle, Transformer, Image } from 'react-konva';
import { useImage } from 'react-konva-utils';

const ImageEditor = () => {
  const [data, setData] = useState([
    {
      id: 'circle',
      type: 'circle',
      x: 100,
      y: 100,
      color: 'blue',
      radius: 50,
      size: null,
    },
    {
      id: 'rect',
      type: 'rect',
      x: 200,
      y: 200,
      color: 'green',
      radius: 50,
      size: null,
    },
  ]);

  const [selected, setSelected] = useState(null);
  const itemRef = useRef(null);
  const transformerRef = useRef(null);

  const handleSelect = (e) => {
    const id = e.target.name();
    setSelected(id);
  };

  useEffect(() => {
    if (selected) {
      transformerRef.current.nodes([itemRef.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [selected]);

  const isAncestorOf = (ancestorNode, node) => {
    if (ancestorNode === node) {
      return true;
    }
    if (node.getParent()) {
      return isAncestorOf(ancestorNode, node.getParent());
    }
    return false;
  };

  const handleDragMove = (e) => {
    const dragNode = e.target;
    const isTransforming =
      transformerRef.current && transformerRef.current.isTransforming();
    const isSelected = isAncestorOf(transformerRef.current, dragNode);

    if (!isSelected && !isTransforming) {
      setSelected(null);
    }
  };

  const handleDragStart = (e) => {
    const id = e.target.name();
    const updatedData = [...data];
    const item = updatedData.find((item) => item.id === id);
    const index = updatedData.indexOf(item);
    updatedData.splice(index, 1);
    updatedData.push(item);
    setData(updatedData);
  };

  const handleDragEnd = (e) => {
    const id = e.target.name();
    const updatedData = [...data];
    const item = updatedData.find((item) => item.id === id);
    const index = updatedData.indexOf(item);
    const { x, y } = e.target.position();
    const size = e.target.radius() * 2; // Calculate size based on radius
    updatedData[index] = {
      ...item,
      x,
      y,
      size,
    };
    setData(updatedData);
  };
  console.log(data, 'data');

  const imageUrl =
    'https://imgv3.fotor.com/images/blog-cover-image/part-blurry-image.jpg'; // Replace with your image URL

  const [image] = useImage(imageUrl);
  return (
    <Stage width={500} height={500}>
      <Layer>
        {data.map((item) => {
          return (
            <Circle
              key={item.id}
              name={item.id}
              draggable
              x={item.x}
              y={item.y}
              fill={item.color}
              radius={item.radius}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onClick={handleSelect}
              onDragMove={handleDragMove}
              ref={selected === item.id ? itemRef : null}
            >
              {/* <Image image={image} width={200} height={200} /> */}
            </Circle>
            // <Image
            //   image={image}
            //   width={200}
            //   height={200}
            //   draggable
            //   // onLoad={handleImageLoad}
            //   key={item.id}
            //   name={item.id}
            //   x={item.x}
            //   y={item.y}
            //   fill={item.color}
            //   radius={item.radius}
            //   onDragStart={handleDragStart}
            //   onDragEnd={handleDragEnd}
            //   onClick={handleSelect}
            //   onDragMove={handleDragMove}
            //   ref={selected === item.id ? itemRef : null}
            // />
          );
        })}
        {selected && (
          <Transformer
            ref={transformerRef}
            anchorSize={6}
            borderEnabled={false}
            keepRatio={false}
            rotateEnabled={false}
            resizeEnabled
            enabledAnchors={[
              'top-left',
              'top-right',
              'bottom-left',
              'bottom-right',
            ]}
          />
        )}
      </Layer>
    </Stage>
  );
};

export default ImageEditor;
