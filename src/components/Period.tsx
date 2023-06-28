import React, { useState, useEffect } from 'react';
import { differenceInBusinessDays } from 'date-fns';

interface PeriodProps {
    start: Date;
    end: Date | null;
  }

export default function Period({ start, end }: PeriodProps) {

   const [period, setPeriod] =  useState<number>(0);

   useEffect(() => {
    if (start && end) {
      let days = differenceInBusinessDays(end, start);
      if (days) {
        setPeriod(days);
      }
    }
  }, [start, end]);

    return (
        <div>
        { period !== 0 &&
            <div className='font-light text-amber-300'>
            Selected leave period: <span className='font-semibold'>{ period }</span> days
            </div>
        
        }
        </div>
    );
}