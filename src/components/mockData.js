export const users = [
    {id: 1, username: 'John', email: 'john@example.com', password: '123456', trips: [1, 3]},
    {id: 1, username: 'Kasia', email: 'kasia@example.com', password: '123456', trips: [1, 3]}
];

export const trips = [
    {
        id: 1,
        name: 'Trip to paris',
        photo: '/img/Placeholder-_-Glossary.svg',
        hotel_coordinates: '',
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
        photo: '/img/Placeholder-_-Glossary.svg',
            user: 1,
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
