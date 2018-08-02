import React from 'react';

export const GridView = ({ className, children, items, RowComponent, loading, ...props }) => {
  let childrenLists = [];
  if (Array.isArray(children)) {
    childrenLists = children;
  } else {
    childrenLists = [children];
  }
  const columns = childrenLists.map(child => ({
    key: child.props.propKey,
    label: child.props.label,
    badge: child.props.badge,
    textAlign: child.props.textAlign
  }));
  return (
    <div>
      {!loading && (
        <table className={`table ${className}`}>
          <thead>
            <tr>{columns.map((column, idx) => <th key={idx}>{column.label}</th>)}</tr>
          </thead>
          <tbody>
            {items.map((item, idx) => <RowComponent key={idx} rowData={item} {...props} columns={columns} />)}
          </tbody>
        </table>
      )}
    </div>
  );
};

export const GridViewColumn = ({ propKey, label }) => {
  return null;
};

export default Object.assign(GridView, {
  GridViewColumn
});
