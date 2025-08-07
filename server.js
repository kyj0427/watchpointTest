// server.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

// ES 서버 주소 상수 (나중에 IP바뀌면 변경)
const ELASTIC_HOST = 'http://192.168.0.31:9200';
const ELASTIC_AUTH = {
  username: 'elastic',
  password: 'watchpoint1234!',
};

// ==========================
// 영웅 검색
// ==========================
app.post('/api/search', async (req, res) => {
  try {
    const esRes = await axios.post(
      `${ELASTIC_HOST}/test_overwatch_heroes/_search`,
      req.body,
      {
        auth: ELASTIC_AUTH,
        headers: { 'Content-Type': 'application/json' },
      }
    );
    res.json(esRes.data);
  } catch (e) {
    console.error("영웅 검색 에러:", e.message);
    res.status(500).json({ error: e.toString() });
  }
});

// ==========================
// 패치노트 전체 조회
// ==========================
app.get('/api/patch', async (req, res) => {
  try {
    const esRes = await axios.post(
      `${ELASTIC_HOST}/test_patchnotes_live/_search`,
      {
        query: {
          match_all: {},
        },
        size: 100,
        sort: [{ "date.keyword": "desc" }],
      },
      {
        auth: ELASTIC_AUTH,
        headers: { 'Content-Type': 'application/json' },
      }
    );
    res.json(esRes.data);
  } catch (e) {
    console.error('패치노트 API 에러:', e.message);
    res.status(500).json({ error: e.toString() });
  }
});

// 개별 패치노트 조회
app.get('/api/patch/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const esRes = await axios.post(
      `${ELASTIC_HOST}/test_patchnotes_live/_search`,
      {
        query: {
          match: {
            anchor_id: id,
          },
        },
        size: 1,
      },
      {
        auth: ELASTIC_AUTH,
        headers: { 'Content-Type': 'application/json' },
      }
    );

    const patch = esRes.data.hits.hits[0]?._source;
    if (!patch) {
      return res.status(404).json({ error: "패치노트를 찾을 수 없습니다." });
    }

    res.json(patch);
  } catch (e) {
    console.error("개별 패치노트 API 에러:", e.message);
    res.status(500).json({ error: e.toString() });
  }
});

// ==========================
//  맵 전체 조회
// ==========================
app.get('/api/maps', async (req, res) => {
  try {
    const esRes = await axios.post(
      `${ELASTIC_HOST}/test_overwatch_maps/_search`,
      {
        query: { match_all: {} },
        sort: [{ "name.keyword": "asc" }],
        size: 100,
      },
      {
        auth: ELASTIC_AUTH,
        headers: { 'Content-Type': 'application/json' },
      }
    );
    res.json(esRes.data);
  } catch (e) {
    console.error('맵 API 에러:', e.message);
    res.status(500).json({ error: e.toString() });
  }
});

// ==========================
// 맵 개별 조회
// ==========================
app.get('/api/maps/:name', async (req, res) => {
  try {
    const mapName = decodeURIComponent(req.params.name);

    const esRes = await axios.post(
      `${ELASTIC_HOST}/test_overwatch_maps/_search`,
      {
        query: {
          match: {
            name: mapName,
          },
        },
        size: 1,
      },
      {
        auth: ELASTIC_AUTH,
        headers: { 'Content-Type': 'application/json' },
      }
    );

    const mapData = esRes.data.hits.hits[0]?._source;
    if (!mapData) {
      return res.status(404).json({ error: "맵을 찾을 수 없습니다." });
    }

    res.json(mapData);
  } catch (e) {
    console.error("개별 맵 API 에러:", e.message);
    res.status(500).json({ error: e.toString() });
  }
});

// ==========================
// 서버 시작
// ==========================
app.listen(4000, () => {
  console.log(' Proxy server running at http://localhost:4000');
  console.log(` Elasticsearch 연결: ${ELASTIC_HOST}`);
});
