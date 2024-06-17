export const users = [
    {id: 1, username: 'John', email: 'john@example.com', password: '123456', trips: [1, 3]},
    {id: 3, username: 'Kasia', email: 'kasia@example.com', password: '123456', trips: [1, 3]}
];

export const trips = [
    {
        id: 1,
        name: 'Trip to paris',
        photo: 'https://images.pexels.com/photos/421655/pexels-photo-421655.jpeg?auto=compress&cs=tinysrgb&h=350',
        hotel_coordinates: '',
        start_time: '07-03-2024',
        end_time: '07-05-2024',
        destination: 'Paris',
        user: 1,
        days: [
            {
                day: 1,
                date: '07-03-2024',
                details:  [
                    {time: '09:00', place: 'Eiffel tower'},
                    {time: '11:00', place: 'Caffe'},
                    {time: '14:00', place: 'Louvre'}
                ]
            },
            {
                day: 2,
                date: '07-04-2024',
                details:  [
                    {time: '09:00', place: 'Eiffel tower'},
                    {time: '11:00', place: 'Caffe'},
                    {time: '14:00', place: 'Notre Dame'}
                ]
            },
            {
                day: 3,
                date: '07-05-2024',
                details:  [
                    {time: '09:00', place: 'Eiffel tower'},
                    {time: '14:00', place: 'Versailles'},
                ]
            }

        ]

    },
        {
        id: 3,
        name: 'Trip to Tokyo',
            hotel_coordinates: '',
        photo: 'https://via.placeholder.com/150',
            user: 1,
            start_time: '07-03-2024',
        end_time: '07-03-2024',
        destination: 'Tokyo',
        days: [
            {
                day: 1,
                date: '07-03-2024',
                details:  [
                    {time: '09:00', place: 'Shibuya'},
                    {time: '11:00', place: 'Capsule Hotel'}
                ]
            }]
    },
    {
        id: 4,
        name: 'Trip to Tokyo',
            hotel_coordinates: '',
        photo: 'https://via.placeholder.com/150',
            user: 1,
            start_time: '07-03-2024',
        end_time: '07-03-2024',
        destination: 'Tokyo',
        days: [
            {
                day: 1,
                date: '07-03-2024',
                details:  [
                    {time: '09:00', place: 'Shibuya'},
                    {time: '11:00', place: 'Capsule Hotel'}
                ]
            }]
    },
    {
        id: 5,
        name: 'Trip to Tokyo',
            hotel_coordinates: '',
        photo: 'https://via.placeholder.com/150',
            user: 1,
            start_time: '07-03-2024',
        end_time: '07-03-2024',
        destination: 'Tokyo',
        days: [
            {
                day: 1,
                date: '07-03-2024',
                details:  [
                    {time: '09:00', place: 'Shibuya'},
                    {time: '11:00', place: 'Capsule Hotel'}
                ]
            }]
    },
    {
        id: 6,
        name: 'Trip to Tokyo',
            hotel_coordinates: '',
        photo: 'https://via.placeholder.com/150',
            user: 1,
            start_time: '07-03-2024',
        end_time: '07-03-2024',
        destination: 'Tokyo',
        days: [
            {
                day: 1,
                date: '07-03-2024',
                details:  [
                    {time: '09:00', place: 'Shibuya'},
                    {time: '11:00', place: 'Capsule Hotel'}
                ]
            }]
    }


]
