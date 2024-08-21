import { Request, Response } from "express";
import Song from "../../models/song.model";
import Topic from "../../models/topic.model";
import Singer from "../../models/singer.model";
import { systemConfig } from "../../config/system";

// [GET] /admin/songs/
export const index = async (req: Request, res: Response) => {
    const songs = await Song.find({
        deleted: false
    });

    res.render("admin/pages/songs/index", {
        pageTitle: "Quản lý bài hát",
        songs: songs
    });
};

// [GET] /admin/songs/create
export const create = async (req: Request, res: Response) => {
    const topics = await Topic.find({
        deleted: false
    }).select("title");

    const singers = await Singer.find({
        deleted: false
    }).select("fullName");

    res.render("admin/pages/songs/create", {
        pageTitle: "Thêm mới bài hát",
        topics: topics,
        singers: singers
    });
};

// [POST] /admin/songs/create
export const createPost = async (req: Request, res: Response) => {
    interface DataSong {
        title: string;
        topicId: string;
        singerId: string;
        description: string;
        status: string;
        lyrics: string;
        avatar?: string;
        audio?: string;
    }
    let avatar = '';
    let audio = '';

    if (req.body.avatar) {
        avatar = req.body.avatar[0];
    }

    if (req.body.audio) {
        audio = req.body.audio[0];
    }
    
    const dataSong: DataSong = {
        title: req.body.title,
        topicId: req.body.topicId,
        singerId: req.body.singerId,
        description: req.body.description,
        status: req.body.status,
        lyrics: req.body.lyrics,
        avatar: avatar,
        audio: audio
    }

    const song = new Song(dataSong);
    await song.save();

    res.redirect(`/${systemConfig.prefixAdmin}/songs`);
};


// [POST] /admin/songs/edit/:songId
export const edit = async (req: Request, res: Response) => {
    const song = await Song.findById(req.params.songId);

    if (!song) {
        return res.status(404).render("error/404");
    }

    const topics = await Topic.find({
        deleted: false
    }).select("title");

    const singers = await Singer.find({
        deleted: false
    }).select("fullName");

    res.render("admin/pages/songs/edit", {
        pageTitle: "Chỉnh sửa bài hát",
        song: song,
        topics: topics,
        singers: singers
    });
}

// [PATCH] /admin/songs/edit/:songId
export const editPatch = async (req: Request, res: Response) => {
    const song = await Song.findById(req.params.songId);

    if (!song) {
        return res.status(404).render("error/404");
    }

    interface DataSong {
        title: string;
        topicId: string;
        singerId: string;
        description: string;
        status: string;
        lyrics: string;
        avatar?: string;
        audio?: string;
    }
    let avatar = '';
    let audio = '';

    if (req.body.avatar) {
        avatar = req.body.avatar[0];
    }

    if (req.body.audio) {
        audio = req.body.audio[0];
    }
    
    if (avatar === '') {
        avatar = song.avatar;
    }

    if (audio === '') {
        audio = song.audio;
    }
    
    const dataSong: DataSong = {
        title: req.body.title,
        topicId: req.body.topicId,
        singerId: req.body.singerId,
        description: req.body.description,
        status: req.body.status,
        lyrics: req.body.lyrics,
        avatar: avatar,
        audio: audio
    }

    await Song.findByIdAndUpdate(req.params.songId, dataSong);

    res.redirect(`/${systemConfig.prefixAdmin}/songs`);
}