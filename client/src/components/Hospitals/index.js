import React, { Component, useState, useEffect } from 'react';
import { get, post } from '../../services/axios';
import Container from './Container.js';
import BookingModal from './BookingModal';
import { withRouter } from 'react-router-dom';
import { Dimmer, Loader } from 'semantic-ui-react';

const Hospitals = ({ history }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [bookedHospital, setBookedHospital] = useState('');

  useEffect(() => {
    get('hospitals')
      .then(data => {
        setData(data);
        setLoading(false);
        setError(false);
      })
      .catch(error => {
        setError(true);
        setLoading(false);
        setData([]);
      });
  }, []);

  const onSearch = () => {
    setError(false);
    setLoading(true);
    setData([]);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        post('hospitals/searchHospitals', {
          lat,
          lng,
          query: searchQuery
        })
          .then(data => {
            setData(data);
            setLoading(false);
            setError(false);
          })
          .catch(error => {
            setError(true);
            setLoading(false);
            setData([]);
          });
      });
    } else {
      alert('Geolocation is not supported by this browser.');
      post('hospitals/searchHospitals', {
        query: searchQuery
      })
        .then(data => {
          setData(data);
          setLoading(false);
          setError(false);
        })
        .catch(error => {
          setError(true);
          setLoading(false);
          setData([]);
        });
    }
  };

  const redirectProfile = id => {
    history.push({
      pathname: '/hospital/' + id
    });
  };

  return (
    <div>
      <Dimmer active={loading}>
        <Loader size="massive" />
      </Dimmer>
      <Container
        redirect={redirectProfile}
        loading={loading}
        pageTitle="Hospitals"
        pageSubHeader="Find the best nearest hospitals to you"
        data={
          Array.isArray(data)
            ? data.map(
                item =>
                  item && {
                    ...item.hospital,
                    duration: item.duration,
                    distance: item.distance
                  }
              )
            : data.hospitals
        }
        error={error}
        setSearchQuery={setSearchQuery}
        searchQuery={searchQuery}
        onSearch={onSearch}
        setBookedHospital={setBookedHospital}
      />
      <BookingModal
        open={bookedHospital !== ''}
        onClose={() => setBookedHospital('')}
        hospitalID={bookedHospital}
      />
    </div>
  );
};

export default withRouter(Hospitals);
