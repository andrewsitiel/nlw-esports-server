import express from "express";
import { PrismaClient } from "@prisma/client";
import { convertHourStringToMinutesNumber } from "./utils/convert-hour-string-to-minutes";
import { convertMinutesNumberToHourString } from "./utils/convert-minutes-to-hour-string";
import cors from "cors";

const app = express();
const prisma = new PrismaClient({
  log: ['query']
});

app.use(express.json());
app.use(cors(
  // {
  //  origin: "https://meudomínio"
  // }
))

app.get("/games", async (request, response) => {
  const games = await prisma.game.findMany(
    {
      include: {
        _count:{
          select: {
            Ads: true
          }
        }
      }
    }
  );

  return response.status(200).json(games)
});

app.post("/games/:id/ads", async (request, response) => {
  const { id } = request.params;
  const { body } = request

  const ad = await prisma.ad.create({
    data:{
      ...body,
      hourStart: convertHourStringToMinutesNumber(body.hourStart),
      hourEnd: convertHourStringToMinutesNumber(body.hourEnd),
      weekDays: body.weekDays.join(","),
      gameId: id
    }
  })

  return response.status(201).json(ad);
});

app.get("/games/:id/ads", async (request, response) => {
    const gameId = request.params.id;
    
    const ads = await prisma.ad.findMany({
      select:{
        id: true,
        name: true,
        weekDays: true,
        yearsPlaying: true,
        hourStart: true,
        hourEnd: true
      },
      
      where:{gameId},

      orderBy:{
        createdAt: "desc",
      }
    })

  response.status(200).json(ads.map(ad => {
        return {
            ...ad,
            weekDays: ad.weekDays.split(","),
            hourStart: convertMinutesNumberToHourString(ad.hourStart),
            hourEnd: convertMinutesNumberToHourString(ad.hourEnd),
          }
      }))
  }
);

app.get("/ads/:id/discord", async (request, response) => {
    const { id } = request.params;

    const { discord } = await prisma.ad.findUniqueOrThrow({
      select: { discord: true },
      where:{ id },
    })

    return response.status(200).json({discord})
  }
);

app.listen(3000)