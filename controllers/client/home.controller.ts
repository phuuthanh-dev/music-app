import { Request, Response } from "express";
import Topic from "../../models/topic.model";
import Song from "../../models/song.model";

// [GET] /
export const index = async (req: Request, res: Response) => {
    const topics = await Topic.find({
        deleted: false
    }).select('title slug avatar').limit(5);

    const topicsLofi = await Topic.find({
        deleted: false,
        type: 'lofi'
    }).select('title slug avatar').limit(5);

    const songs = await Song.find({
        deleted: false
    });

    res.render('client/pages/home/index', {
        pageTitle: "Trang chủ",
        topics: topics,
        topicsLofi: topicsLofi,
        songs: songs
    });
}