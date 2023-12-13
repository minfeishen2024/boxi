'use client'

import { Range } from "react-date-range";


import Calendar from "../inputs/Calendar";
import Button from "../Button"
import Counter from "../inputs/Counter";
import { useState } from "react";
import TrueFalseSelect from "../inputs/TrueFalseSelect";
import { SafeUser } from "@/app/types";

interface ListingReservationProps {
    price: number;
    dateRange: Range;
    totalPrice: number;
    numOfBox: number;
    storeHazard: boolean;
    storePerishable: boolean;
    storeFlammable: boolean;
    onChangeDate: (value:Range) => void;
    onChangeBox:(value: number) => void;
    onChangeHazard:(value: boolean) => void;
    onChangeFlammable:(value: boolean) => void;
    onChangePerishable:(value: boolean) => void;
    onSubmit: () => void;
    disabled?: boolean;
    disabledDates: Date[]
    user?: SafeUser

}

const ListingReservation:React.FC<ListingReservationProps> = ({
    price,
    dateRange,
    totalPrice,
    numOfBox,
    storeHazard,
    storePerishable,
    storeFlammable,
    onChangeDate,
    onChangeBox,
    onSubmit,
    onChangeFlammable,
    onChangeHazard,
    onChangePerishable,
    disabled,
    disabledDates,
    user
}) => {

    const reserveLable = "Reserve With"

    
    return(
        <div className="bg-white
            rounded-xl
            border-[1px]
            border-foreground-1
            overflow-hidden">
                <div className="
                    flex flex-row items-center gap-1 p-4">
                        <div className="text-2xl font-semibold">${price}</div>
                        <div className="font-light text-neutral-500">
                            per box/week
                        </div>
                
                    </div>
                    <hr/>
                    <Calendar
                        value={dateRange}
                        disabledDates={disabledDates}
                        onChange={(value) => 
                        onChangeDate(value.selection)}
      />
      <hr />
      <div className="px-3">
      <Counter title="How many boxes are you storing?"
                        value={numOfBox}
                        onChange={(value)=> onChangeBox(value)}/>
        </div>
      <hr/>
      <div className="p-4
            flex
            flex-row
            items-center
            justify-between
            font-semibold
            text-lg">
                <div>Check all that may apply to your item:</div>

      </div>

      
        <hr />
      <div className="px-3">
      <TrueFalseSelect title="Dangerous Item"
                        value={storeHazard}
                        onChange={(value)=> onChangeHazard(value)}/>
        </div>
        <hr />
      <div className="px-3">
      <TrueFalseSelect title="Perishable Item"
                        value={storePerishable}
                        onChange={(value)=> onChangePerishable(value)}/>
        </div>
        <hr />
      <div className="px-3">
      <TrueFalseSelect title="Inflammable Item"
                        value={storeFlammable}
                        onChange={(value)=> onChangeFlammable(value)}/>
        </div>
    
      <div className="p-4
            flex
            flex-row
            items-center
            justify-between
            font-semibold
            text-lg">
                <div>Total</div>
                <div>${totalPrice}</div>

      </div>
      <div className="p-4">
        <Button
            disabled={disabled}
            label={`Reserve with ${user?.name}`}
            onClick={onSubmit}/>
            
      </div>

                

        </div>
    )
}

export default ListingReservation