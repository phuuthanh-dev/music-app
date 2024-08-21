import { Request, Response } from "express";
import Song from "../../models/song.model";
import Topic from "../../models/topic.model";
import Singer from "../../models/singer.model";
import FavoriteSong from "../../models/fovorite-song.model";


// [GET] /songs/:slugTopic
export const list = async (req: Request, res: Response) => {
    const slugTopic = req.params.slugTopic;
    const topic = await Topic.findOne({ slug: slugTopic, deleted: false, status: "active" });

    const songs = await Song.find({ topicId: topic.id, deleted: false, status: "active" });

    for (const item of songs) {
        const singer = await Singer.findOne({
            _id: item.singerId,
            deleted: false
        }).select("fullName");

        item["singer"] = singer;
    }

    res.render('client/pages/songs/list', {
        pageTitle: topic.title,
        songs: songs
    });
}

// [GET] /songs/detail/:slugSong
export const detail = async (req: Request, res: Response) => {
    try {
        const slugSong = req.params.slugSong;

        const song = await Song.findOne({ slug: slugSong, deleted: false, status: "active" });
        const topic = await Topic.findOne({ _id: song.topicId, deleted: false, status: "active" }).select("title");
        const singer = await Singer.findOne({ _id: song.singerId, deleted: false }).select("fullName");
        const favoriteSong = await FavoriteSong.findOne({ userId: "", songId: song.id });

        song["favorite"] = favoriteSong ? true : false;

        res.render('client/pages/songs/detail', {
            pageTitle: song.title,
            topic: topic,
            song: song,
            singer: singer,
        });
    } catch (error) {
        console.log(error);
    }
}

// [PATCH] /songs/like/:status/:songId
export const like = async (req: Request, res: Response) => {
    const status = req.params.status;

    const song = await Song.findOne({
        _id: req.params.songId,
        deleted: false,
        status: "active"
    });

    const updateLike = status == "like" ? song.like + 1 : song.like - 1;

    await Song.updateOne({
        _id: req.params.songId,
        deleted: false,
        status: "active"
    }, {
        like: updateLike
    });

    res.json({
        code: 200,
        message: "Cập nhật thành công",
        like: updateLike
    });
};

// [PATCH] /songs/favorite/:status/:songId
export const favoritePatch = async (req: Request, res: Response) => {
    const status = req.params.status;
    const songId = req.params.songId;

    if (status == "favorite") {
        const favoriteSong = new FavoriteSong({
            userId: "",
            songId: songId
        });
        await favoriteSong.save();
    } else {
        await FavoriteSong.deleteOne({
            userId: "",
            songId: songId
        });
    }

    res.json({
        code: 200,
        message: status == "favorite" ? "Đã thêm vào yêu thích" : "Đã xóa yêu thích"
    });
};

// [GET] /songs/favorite
export const favorite = async (req: Request, res: Response) => {
    const favoriteSongs = await FavoriteSong.find({
        userId: ""
    });

    for (const item of favoriteSongs) {
        const song = await Song.findOne({
            _id: item.songId
        }).select("avatar title slug singerId");

        const singer = await Singer.findOne({
            _id: song.singerId
        }).select("fullName");

        item["song"] = song;
        item["singer"] = singer;
    }

    res.render("client/pages/songs/favorite", {
        pageTitle: "Yêu thích",
        favoriteSongs: favoriteSongs
    });
}

// [PATCH] /listen/:songId
export const listenPatch = async (req: Request, res: Response) => {
    const songId = req.params.songId;

    const song = await Song.findOne({
        _id: songId,
        status: "active",
        deleted: false
    });

    const listenUpdate = song.listen + 1;

    await Song.updateOne({
        _id: songId,
        status: "active",
        deleted: false
    }, {
        listen: listenUpdate
    });

    res.json({
        code: 200,
        message: "Đã cập nhật số lượt nghe!",
        listen: listenUpdate
    });
};