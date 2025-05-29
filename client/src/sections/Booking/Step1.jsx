import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

export default function BookingStep1({ onNext }) {
  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      checkIn: null,
      checkOut: null,
      rooms: "1",
      adults: "1",
      children: "0",
    },
  });

  const onSubmit = (data) => {
    // pass data to parent or next step
    onNext(data);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-300">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-xl w-full sm:w-1/2 mx-auto space-y-6 p-6 bg-white rounded-md shadow-md"
      >
        {/* Check-in Date */}
        <div>
          <Label htmlFor="checkIn" className="mb-1 block font-semibold">
            Check-in Date
          </Label>
          <Controller
            control={control}
            name="checkIn"
            rules={{ required: "Check-in date is required" }}
            render={({ field }) => (
              <Popover>
                <PopoverTrigger asChild>
                  <Input
                    placeholder="Select check-in date"
                    readOnly
                    value={field.value ? field.value.toLocaleDateString() : ""}
                    {...field}
                  />
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            )}
          />
        </div>

        {/* Check-out Date */}
        <div>
          <Label htmlFor="checkOut" className="mb-1 block font-semibold">
            Check-out Date
          </Label>
          <Controller
            control={control}
            name="checkOut"
            rules={{
              required: "Check-out date is required",
              validate: (value) => {
                const checkIn = watch("checkIn");
                if (!checkIn) return "Select check-in first";
                return value > checkIn || "Check-out must be after check-in";
              },
            }}
            render={({ field, fieldState }) => (
              <>
                <Popover>
                  <PopoverTrigger asChild>
                    <Input
                      placeholder="Select check-out date"
                      readOnly
                      value={
                        field.value ? field.value.toLocaleDateString() : ""
                      }
                      {...field}
                    />
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => {
                        const checkIn = watch("checkIn");
                        return !checkIn || date <= checkIn;
                      }}
                    />
                  </PopoverContent>
                </Popover>
                {fieldState.error && (
                  <p className="text-sm text-red-600 mt-1">
                    {fieldState.error.message}
                  </p>
                )}
              </>
            )}
          />
        </div>

        {/* Number of Rooms */}
        <div>
          <Label htmlFor="rooms" className="mb-1 block font-semibold">
            Number of Rooms
          </Label>
          <Controller
            control={control}
            name="rooms"
            render={({ field }) => (
              <Select {...field}>
                <SelectTrigger>
                  <SelectValue placeholder="Select number of rooms" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <SelectItem key={num} value={String(num)}>
                      {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        {/* Number of Adults */}
        <div>
          <Label htmlFor="adults" className="mb-1 block font-semibold">
            Adults
          </Label>
          <Controller
            control={control}
            name="adults"
            render={({ field }) => (
              <Select {...field}>
                <SelectTrigger>
                  <SelectValue placeholder="Select adults" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <SelectItem key={num} value={String(num)}>
                      {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        {/* Number of Children */}
        <div>
          <Label htmlFor="children" className="mb-1 block font-semibold">
            Children
          </Label>
          <Controller
            control={control}
            name="children"
            render={({ field }) => (
              <Select {...field}>
                <SelectTrigger>
                  <SelectValue placeholder="Select children" />
                </SelectTrigger>
                <SelectContent>
                  {[0, 1, 2, 3, 4].map((num) => (
                    <SelectItem key={num} value={String(num)}>
                      {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <Button type="submit" className="w-full">
          Check Availability
        </Button>
      </form>
    </div>
  );
}
