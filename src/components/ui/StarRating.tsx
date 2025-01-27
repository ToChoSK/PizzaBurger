import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
    rating: number;
}

export const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
    const roundedRating = Math.round(rating * 4) / 4; // Round to nearest quarter
    const fullStars = Math.floor(roundedRating);
    const fractionalStar = roundedRating % 1;

    return (
        <div className="flex items-center">
            {[...Array(5)].map((_, index) => {
                if (index < fullStars) {
                    return <Star key={index} className="w-5 h-5 text-yellow-400 fill-current" />;
                } else if (index === fullStars && fractionalStar > 0) {
                    if (fractionalStar <= 0.25) {
                        return (
                            <div key={index} className="relative w-5 h-5">
                                <Star className="absolute w-5 h-5 text-gray-300" />
                                <div className="absolute overflow-hidden w-[40%]">
                                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                                </div>
                            </div>
                        );

                    } else if (fractionalStar <= 0.5) {
                        return (
                            <div key={index} className="relative w-5 h-5">
                                <Star className="absolute w-5 h-5 text-gray-300" />
                                <div className="absolute overflow-hidden w-[50%]">
                                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                                </div>
                            </div>
                        );
                    }
                    else if (fractionalStar <= 0.75) {
                        return (
                            <div key={index} className="relative w-5 h-5">
                                <Star className="absolute w-5 h-5 text-gray-300" />
                                <div className="absolute overflow-hidden w-[60%]">
                                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                                </div>
                            </div>
                        );
                    } else {
                        return <Star key={index} className="w-5 h-5 text-yellow-400 fill-current" />;
                    }
                } else {
                    return <Star key={index} className="w-5 h-5 text-gray-300" />;
                }
            })}
            <span className="ml-2 text-sm text-gray-600">{rating.toFixed(1)}</span>
        </div>
    );
};
