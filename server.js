// server.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

//영웅 검색
app.post('/api/search', async (req, res) => {
  try {
    const esRes = await axios.post(
      'http://localhost:9200/test_overwatch_heroes/_search',
      req.body,
      {
        auth: {
          username: 'elastic',
          password: 'watchpoint1234!',
        },
        headers: { 'Content-Type': 'application/json' },
      }
    );
    res.json(esRes.data);
  } catch (e) {
    res.status(500).json({ error: e.toString() });
  }
});

// 패치노트 검색
app.get('/api/patch', async (req, res) => {
  try {
    const esRes = await axios({
      method: 'POST',
      url: 'http://localhost:9200/test_patchnotes_live/_search',
      auth: {
        username: 'elastic',
        password: 'watchpoint1234!',
      },
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        query: {
          match_all: {}
        },
        size: 100,
        sort: [
          { "date.keyword": "desc" }
        ]
      }
    });

    res.json(esRes.data);
  } catch (e) {
    console.error('패치노트 API 에러:', e.message);
    res.status(500).json({ error: e.toString() });
  }
});

//맵 목록 조회 
app.get('/api/maps', async (req, res) => {
  try {
    const esRes = await axios.post(
      'http://localhost:9200/test_overwatch_maps/_search',
      {
        query: { match_all: {} },
        sort: [{ "name.keyword": "asc" }],
        size: 100
      },
      {
        auth: {
          username: 'elastic',
          password: 'watchpoint1234!',
        },
        headers: { 'Content-Type': 'application/json' },
      }
    );
    res.json(esRes.data);
  } catch (e) {
    console.error('맵 API 에러:', e.message);
    res.status(500).json({ error: e.toString() });
  }
});

// 특정 맵 정보 조회
app.get('/api/maps/:name', async (req, res) => {
  try {
    const mapName = decodeURIComponent(req.params.name);

    const esRes = await axios.post(
      'http://localhost:9200/test_overwatch_maps/_search',
      {
        query: {
          match: {
            name: mapName
          }
        },
        size: 1
      },
      {
        auth: {
          username: 'elastic',
          password: 'watchpoint1234!',
        },
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

app.listen(4000, () => console.log('Proxy server running at http://localhost:4000'));
