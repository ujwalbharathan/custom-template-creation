import React, { useEffect, useRef, useState } from 'react';
import {
  Stage,
  Layer,
  Circle,
  Transformer,
  Image,
  Rect,
  Text,
} from 'react-konva';
import { useImage } from 'react-konva-utils';

export const Canvas = ({ dragType }: { dragType: string }) => {
  const stageRef = React.useRef();
  const [data, setData] = useState<any[]>([
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
      width: 40,
      height: 40,
      color: 'green',
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

  const handleDragEnd = (e, value) => {
    console.log(value, 'value---');
    if (value.type === 'circle') {
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
    } else if (value.type === 'rect') {
      const id = parseInt(e.target.name(), 10);
      const updatedData = data.map((item: any) => {
        if (item.id === id) {
          const { x, y, width, height } = e.target;
          return { ...item, x, y, width, height };
        }
        return item;
      });
      setData(updatedData);
    }
  };
  console.log(data, 'data');

  const handleOnDrop = (e: any) => {
    e.preventDefault();
    console.log(stageRef.current.getPointerPosition(), 'position----');
    const xValue = stageRef.current.getPointerPosition().x;
    const yValue = stageRef.current.getPointerPosition().y;
    if (dragType === 'circle') {
      const value = {
        id: `circle` + data.length + 1,
        type: 'circle',
        x: 150,
        y: 150,
        color: 'black',
        radius: 50,
        size: null,
      };
      setData([...data, value]);
    } else if (dragType === 'rect') {
      const value = {
        id: `rect` + data.length + 1,
        type: 'rect',
        x: 150,
        y: 150,
        color: 'black',
        width: 100,
        height: 100,
        size: null,
      };
      setData([...data, value]);
    } else if (dragType === 'image') {
      const imageUrl =
        'https://imgv3.fotor.com/images/blog-cover-image/part-blurry-image.jpg';
      const value = {
        id: `image` + data.length + 1,
        type: 'image',
        x: 150,
        y: 150,
        color: 'black',
        width: 100,
        height: 100,
        size: null,
        imageUrl: imageUrl,
      };
      setData([...data, value]);
    } else if (dragType === 'text') {
      const value = {
        id: `rect` + data.length + 1,
        type: 'text',
        x: 150,
        y: 150,
        color: 'black',
        width: 100,
        height: 100,
        size: null,
        text: 'Sample Text',
      };
      // key={item.id}
      // name={item.id}
      // draggable
      // x={item.x}
      // y={item.y}
      // text={item.text}
      // fill={item.color}
      // fontSize={item.fontSize}
      // fontFamily={item.fontFamily}
      // onDragStart={handleDragStart}
      // onDragEnd={(e: any) => {
      //   handleDragEnd(e, item);
      // }}
      // onClick={handleSelect}
      // onDragMove={handleDragMove}
      // ref={selected === item.id ? itemRef : null}
      setData([...data, value]);
    }
    // register event position
    // stageRef.current.setPointersPositio stageRef.current.getPointerPosition();
    // add image
    // setImages(
    //   images.concat([
    //     {
    //       ...stageRef.current.getPointerPosition(),
    //       src: dragUrl.current,
    //     },
    //   ])
    // );
  };

  const imageUrl =
    'https://imgv3.fotor.com/images/blog-cover-image/part-blurry-image.jpg'; // Replace with your image URL

  const [image] = useImage(imageUrl);
  return (
    <div onDrop={handleOnDrop} onDragOver={(e) => e.preventDefault()}>
      <Stage width={500} height={window.innerHeight - 24} ref={stageRef}>
        <Layer>
          {data.map((item) => {
            if (item.type === 'circle') {
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
                  onDragEnd={(e) => {
                    handleDragEnd(e, item);
                  }}
                  onClick={handleSelect}
                  onDragMove={handleDragMove}
                  ref={selected === item.id ? itemRef : null}
                ></Circle>
              );
            } else if (item.type === 'rect') {
              return (
                <Rect
                  key={item.id}
                  name={item.id}
                  draggable
                  x={item.x}
                  y={item.y}
                  fill={item.color}
                  onDragStart={handleDragStart}
                  onDragEnd={(e: any) => {
                    handleDragEnd(e, item);
                  }}
                  onClick={handleSelect}
                  onDragMove={handleDragMove}
                  ref={selected === item.id ? itemRef : null}
                  width={item.width}
                  height={item.height}
                ></Rect>
              );
            } else if (item.type === 'image') {
              return (
                <Image
                  image={image}
                  key={item.id}
                  name={item.id}
                  draggable
                  x={item.x}
                  y={item.y}
                  fill={item.color}
                  onDragStart={handleDragStart}
                  onDragEnd={(e: any) => {
                    handleDragEnd(e, item);
                  }}
                  onClick={handleSelect}
                  onDragMove={handleDragMove}
                  ref={selected === item.id ? itemRef : null}
                  width={item.width}
                  height={item.height}
                />
              );
            } else if (item.type === 'text') {
              return (
                <Text
                  key={item.id}
                  name={item.id}
                  draggable
                  x={item.x}
                  y={item.y}
                  text={item.text}
                  fill={item.color}
                  fontSize={item.fontSize}
                  fontFamily={item.fontFamily}
                  onDragStart={handleDragStart}
                  onDragEnd={(e: any) => {
                    handleDragEnd(e, item);
                  }}
                  onClick={handleSelect}
                  onDragMove={handleDragMove}
                  ref={selected === item.id ? itemRef : null}
                />
              );
            } else null;
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
    </div>
  );
};
