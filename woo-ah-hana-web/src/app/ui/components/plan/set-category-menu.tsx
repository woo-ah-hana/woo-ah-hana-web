"use client";

import { Card, CardTitle } from "@/app/ui/molecule/card/card";
import {
  categoryColors,
  categoryIcons,
  categoryTextColors,
} from "@/app/ui/atom/category/category";
import Image from "next/image";

interface Category {
  key: string;
  label: string;
}

interface CategoryMenuProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategorySelect: (key: string) => void;
}

export function CategoryMenu({
  categories,
  selectedCategory,
  onCategorySelect,
}: CategoryMenuProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {categories.map((category) => (
        <Card
          key={category.key}
          onClick={() => onCategorySelect(category.key)}
          className={`relative pb-[100%] overflow-hidden rounded-lg cursor-pointer ${
            categoryColors[category.key]
          } ${
            selectedCategory === category.key
              ? "outline outline-2 outline-blue-500 opacity-90"
              : "hover:opacity-80"
          }`}
          style={{
            boxSizing: "border-box",
          }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center p-1">
            <div className="flex flex-col items-center justify-center gap-2 h-full">
              <div className="w-[90%] flex items-center justify-center aspect-square">
                <Image
                  src={categoryIcons[category.key]}
                  alt={category.label}
                  width={60}
                  height={60}
                  className="object-contain"
                />
              </div>
              <CardTitle className="text-center">
                <div
                  className={`${
                    categoryTextColors[category.key]
                  } font-bold md:text-base lg:text-lg`}
                >
                  {category.label}
                </div>
              </CardTitle>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
