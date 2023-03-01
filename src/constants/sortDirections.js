const sortDirections = {
  asc: 'asc',
  desc: 'desc',
  none: 'none'
};

export const getNextSortDirection = (current) => {
  switch (current) {
    case sortDirections.asc:
      return sortDirections.desc;
    case sortDirections.desc:
      return sortDirections.none;
    case sortDirections.none:
      return sortDirections.asc;

    default:
      return sortDirections.asc;
  }
};

export default sortDirections;
