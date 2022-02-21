import React, { ReactEventHandler, useEffect, useState } from 'react';
import { Button, Grid, Paper, TextField, Avatar, Typography, Card, CardContent, Chip, Tooltip, Alert, Collapse } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import moment from 'moment';
import { GitHubUSerData, GitHubUSerRepos } from './interfaces';
import { getUserGithubByUserName, getReposByUserName } from './requests';
import { PrincipalPaper } from './styles';


export function Principal() {
const [ openAlert, setOpenAlert] = useState(false);
const [ userName, setUserName] = useState<string>('');
const [ gitUserData, setGitUSerData] = useState<GitHubUSerData>();
const [ gitUserRepos, setGitUSerRepos] = useState<GitHubUSerRepos[]>([]);

useEffect(() =>{
  gitUserData && getRespoFromUser();
},[gitUserData])

useEffect(() =>{
  openAlert && setTimeout(()=> setOpenAlert(false),2000);
},[openAlert])

async function getGitUser() {
  setGitUSerData(undefined);
  setGitUSerRepos([]);
  getUserGithubByUserName(userName)
    .then(resp => setGitUSerData(resp.data))
    .catch(err => setOpenAlert(true));
  
}

async function getRespoFromUser() {
  getReposByUserName(userName)
    .then(resp => setGitUSerRepos(resp.data));
}

  return (<>
    <PrincipalPaper elevation={3}>
      <Grid container spacing={2} padding={4}>
        {gitUserData && 
        <>
          <Grid item xs={11} sm={1}>
            <Avatar alt={gitUserData?.name} src={gitUserData?.avatar_url} sx={{ width: 90, height: 90 }}/>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography>
              {`Name: ${gitUserData?.name}`}
            </Typography>
            <Typography>
              {`Location: ${gitUserData?.location}`}
            </Typography>
            <Typography variant="caption">
              <b>URL: </b>{gitUserData?.url}
            </Typography>
          </Grid>
        </>
        }
        <Grid item xs={12} sm={2}>
          <TextField label='User Name GitHub' value={userName} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setUserName(event.target.value)}/>
        </Grid>
        <Grid item xs={12} sm={2}>
          <Button  variant="contained" onClick={getGitUser}>Find GitHub</Button>
        </Grid>
      </Grid>

      <Grid container spacing={2} padding={4}>
        {gitUserRepos ? gitUserRepos.map(repo => (
          <Tooltip title="Go to Repo on click" placement="top">
          <Grid key={repo.id} item xs={12} sm={3}>
            <Card sx={{ minWidth: 275 }} onClick={() => window.open(repo.clone_url, "_blank") }>
              <CardContent>
                <Chip label={< div style={{display:'flex'}} ><StarIcon fontSize='small'/>  <Typography> : {repo.stargazers_count}</Typography></div>}/>
                <Typography>
                  <b>Name: </b>{repo.name}
                </Typography>
                <Typography>
                  <b>Create Date: </b>{moment(repo.created_at).format('DD/MM/yyyy')}
                </Typography>
                <Typography>
                  <b>Last Update: </b>{moment(repo.updated_at).format('DD/MM/yyyy')}
                </Typography>
                <Typography>
                  <b>Languages: </b>{repo.language}
                </Typography>
                <Typography variant="caption">
                  {repo.clone_url}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          </Tooltip>
        ))
        :                 
          <Typography variant="caption">
            <b>No repositories found for this user.</b>
          </Typography>
        }
      </Grid>
      <Collapse in={openAlert}>
       <Alert  severity="error"  onClick={() => setOpenAlert(false)}>User not found in GitHub database!</Alert>
      </Collapse>
    </PrincipalPaper>
  </>)
}