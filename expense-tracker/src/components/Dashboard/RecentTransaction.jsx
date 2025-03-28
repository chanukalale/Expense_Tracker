import React from 'react';
import { LuArrowRight } from 'react-icons/lu';
import TransactionInfoCard from '../Cards/TransactionInfoCard';

const RecentTransaction = ({
  transactions = [], 
  onSeeMore = () => {}
}) => {
  const formatDate = (dateString) => {
    return new Intl.DateTimeFormat('en-US', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    }).format(new Date(dateString));
  };

  return (
    <div className='card'>
      <div className='flex items-center justify-between'>
        <h5 className='text-lg'>Recent Transactions</h5>

        <button 
          className='card-btn' 
          onClick={onSeeMore}
          disabled={transactions.length === 0}
        >
          See All <LuArrowRight className='text-base' />
        </button>
      </div>

      <div className='mt-6'>
        {transactions.length > 0 ? (
          transactions.slice(0, 5).map((item) => (
            <TransactionInfoCard
              key={item._id}
              title={item.type === 'expense' ? item.category : item.source}
              icon={item.icon}
              date={formatDate(item.date)}
              amount={item.amount}
              type={item.type}
              hideDeleteBtn
            />
          ))
        ) : (
          <p className='text-center text-gray-500'>No recent transactions</p>
        )}
      </div>
    </div>
  );
};

export default RecentTransaction;