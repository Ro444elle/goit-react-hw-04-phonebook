import React from 'react';
import PropTypes from 'prop-types';

export default function ContactItem({ contact }) {
  return (
    <div>
      {contact.name} - {contact.number}
    </div>
  );
}

ContactItem.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }).isRequired,
};
