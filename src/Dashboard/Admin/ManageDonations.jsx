import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FaCheck, FaTimes } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hook/useAxiosSecure';
import useAxios from '../../Hook/useAxios';
import loadingAnimation from '../../assets/loadingAnimation.json'
import Lottie from 'lottie-react';
import Useable from '../../Useable';
import { useEffect } from 'react';

const ManageDonations = () => {
  const queryClient = useQueryClient();
  const axiossecure = useAxiosSecure();
  const axiosSecure = useAxios();
  useEffect(() => {
     document.title = " Manage Donations";
   }, []);
  const { 
    data: donations = [], 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ['donations'],
    queryFn: async () => {
      try {
        const res = await axiossecure.get('/admin/pending-donations');
        return Array.isArray(res?.data) ? res.data : [];
      } catch (err) {
        console.error('Error fetching donations:', err);
        throw err;
      }
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ donationId, status }) =>
      axiosSecure.patch(`/admin/donations/${donationId}/status`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['donations'] });
      Swal.fire('Success', 'Donation status updated', 'success');
    },
    onError: (error) => {
      console.error('Status update error:', error);
      Swal.fire('Error', error.response?.data?.message || 'Failed to update donation status', 'error');
    },
  });

  const handleUpdateStatus = (donationId, status) => {
    Swal.fire({
      title: 'Confirm Status Change',
      text: `Are you sure you want to ${status.toLowerCase()} this donation?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, update it!',
    }).then((result) => {
      if (result.isConfirmed) {
        updateStatusMutation.mutate({ donationId, status });
      }
    });
  };

  if (isLoading) {
<div className="h-screen flex justify-center items-center">
        <Lottie animationData={loadingAnimation} loop={true} className="w-48" />
      </div>  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        Error loading donations: {error.message}
      </div>
    );
  }

  if (!Array.isArray(donations) || donations.length === 0) {
    return (
      <div className="text-center py-8">
       <Useable/>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Manage Donations</h1>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Donation
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Restaurant
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Food Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {donations.map((donation) => (
              <tr key={donation._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img
                        className="h-10 w-10 rounded"
                        src={donation.image || '/default-donation.png'}
                        alt={donation.title}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/default-donation.png';
                        }}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {donation.title || 'Untitled Donation'}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {donation.restaurantName || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {donation.foodType || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {donation.quantity || '0'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${donation.status === 'Verified' ? 'bg-green-100 text-green-800' : 
                        donation.status === 'Rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}
                  >
                    {donation.status || 'Pending'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleUpdateStatus(donation._id, 'Verified')}
                      disabled={donation.status === 'Verified'}
                      className={`p-2 rounded-md ${donation.status === 'Verified' ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-green-100 text-green-600 hover:bg-green-200'}`}
                      title="Verify"
                    >
                      <FaCheck />
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(donation._id, 'Rejected')}
                      disabled={donation.status === 'Rejected'}
                      className={`p-2 rounded-md ${donation.status === 'Rejected' ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-red-100 text-red-600 hover:bg-red-200'}`}
                      title="Reject"
                    >
                      <FaTimes />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageDonations;
