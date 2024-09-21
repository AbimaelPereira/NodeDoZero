// database/database-postgres.js
import Video from '../models/Video.js';

export class DatabasePostgres {

    async list(search = '') {
        const options = {
            where: {},
            raw: true,
        };

        if (search) {
            options.where.title = {
                [Op.iLike]: `%${search}%`,
            };
        }

        return await Video.findAll(options);
    }

    async create(video) {
        return await Video.create(video);
    }

    async update(id, video) {
        await Video.update(video, { where: { id } });
    }

    async delete(id) {
        await Video.destroy({ where: { id } });
    }
}
