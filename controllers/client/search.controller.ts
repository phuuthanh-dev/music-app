import { Request, Response } from "express";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
import { convertToSlug } from "../../helpers/convertToSlug";

// [GET] /search/:type
export const result = async (req: Request, res: Response) => {
    const type = req.params.type;

    const keyword: string = `${req.query.keyword}`;

    const stringSlug = convertToSlug(keyword);
    const keyWordSlugRegex = new RegExp(stringSlug, "i");

    const keyWordRegex = new RegExp(keyword, "i");

    const songsDetail = [];

    if (keyword) {
        const songs = await Song.find({
            $or: [
                { slug: keyWordSlugRegex },
                { title: keyWordRegex }
            ],
            deleted: false,
            status: "active"
        }).select("avatar title singerId like slug");

        for (const item of songs) {
            const singer = await Singer.findOne({
                _id: item.singerId,
                deleted: false
            }).select("fullName");

            songsDetail.push({
                id: item.id,
                avatar: item.avatar,
                title: item.title,
                like: item.like,
                slug: item.slug,
                singer: {
                    fullName: singer.fullName
                },
            });
        }
    }

    if (type == "result") {
        res.render("client/pages/search/result", {
            pageTitle: `Kết quả: ${keyword}`,
            keyword: keyword,
            songs: songsDetail
        });
    } else {
        res.json({
            code: 200,
            songs: songsDetail
        });
    }
};