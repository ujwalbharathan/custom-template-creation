import React, { forwardRef } from 'react';
import { Circle, Image, Rect } from 'react-konva';

interface ItemRenderProps {
  item: any;
  handleDragStart: any;
  handleSelect: any;
  handleDragEnd: any;
  handleDragMove: any;
  selected: any;
}

const ItemRender: React.ForwardRefRenderFunction<
  HTMLDivElement,
  ItemRenderProps
> = (props, ref) => {
  const {
    item,
    handleDragStart,
    handleSelect,
    handleDragEnd,
    handleDragMove,
    selected,
  } = props;

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
        ref={selected === item.id ? ref : null}
      />
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
        ref={selected === item.id ? ref : null}
        width={item.width}
        height={item.height}
      />
    );
  } else if (item.type === 'image') {
    const [image] = useImage(item.imageUrl);

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
        ref={selected === item.id ? ref : null}
        width={item.width}
        height={item.height}
      />
    );
  } else if (item.type === 'text') {
    return null; // Placeholder for text rendering, add your text rendering logic here
  } else {
    return null; // Default case, return null or handle the case accordingly
  }
};

const ForwardedItemRender = forwardRef<HTMLDivElement, ItemRenderProps>(
  ItemRender
);

export default ForwardedItemRender;
