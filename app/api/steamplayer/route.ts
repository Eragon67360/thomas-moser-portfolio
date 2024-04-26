import { NextResponse } from "next/server";
import { getPlayerSummaries } from "@/services/steam.service";

export async function GET() {

    const response = await getPlayerSummaries();

    if (response.status != 200) {
        return NextResponse.json({
            steam: {
                personastate: "Offline",
            },
        });
    }

    const steam = await response.json();
    if (steam.item === null) {
        return NextResponse.json({
            steam: {
                personastate: "Offline",
            },
        });
    }

    const getPersonName = steam.response.players[0].personaname;
    const getRealName = steam.response.players[0].realname;
    const getAvatar = steam.response.players[0].avatarfull;
    const getLoc = steam.response.players[0].loccountrycode;
    const getLastLog= steam.response.players[0].lastlogoff;
    const getStatus =
        steam.response.players[0].personastate === 1
            ? "Online 😆"
            : steam.response.players[0].personastate === 2
                ? "Busy 😐"
                : steam.response.players[0].personastate === 3
                    ? "Away 🥱"
                    : "Offline 😴";

    const getGames = !steam.response.players[0].gameextrainfo
        ? false
        : `Playing - ${steam.response.players[0].gameextrainfo} 😆`;
    const getprofileUrl = steam.response.players[0].profileurl;
    return NextResponse.json({
        steam: {
            getPersonName,
            getRealName,
            getAvatar,
            getStatus,
            getLoc,
            getLastLog,
            getGames,
            getprofileUrl,
        },
    });
}
