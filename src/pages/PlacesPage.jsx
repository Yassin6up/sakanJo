import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';
import AccountNav from '@/components/ui/AccountNav';
import InfoCard from '@/components/ui/InfoCard';
import Spinner from '@/components/ui/Spinner';
import { useAuth } from '../../hooks/index';
import InstallModal from '@/components/ui/InstallAppModal';
const PlacesPage = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          const response = await axios.get(
            `https://backend.sakanijo.com/api/places/by-owner/${user?.id}`,
          );
          setPlaces(response.data.places.reverse());
          console.log(response);
          setLoading(false);
        }
      } catch (error) {
        // setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <AccountNav />
      <div className="text-center ">
        {/* <Link
          className="inline-flex gap-1 rounded-full bg-primary px-6 py-2 text-white"
          to={'/account/places/new'}
        > */}
      <InstallModal text={"قم بتحميل تطبيق سكني لكي تستطيع نشر اعلاناتك "} />
        {/* </Link> */}
      </div>
      <div className="mx-4 mt-4">
        {places.length > 0 &&
          places.map((place) => <InfoCard place={place} key={place.id} />)}
      </div>
    </div>
  );
};

export default PlacesPage;
